from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime
from flask import send_from_directory
import os

app = Flask(__name__)
CORS(app)

# === SERVE STATIC FILES === 
FRONTEND_DIST = os.path.join(os.path.dirname(__file__), "frontend_build")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(FRONTEND_DIST, path)):
        return send_from_directory(FRONTEND_DIST, path)
    else:
        return send_from_directory(FRONTEND_DIST, "index.html")
        
# === CONFIG ===
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chamasense.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'replace-with-a-secure-random-string'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=7)

# === INIT DB + JWT ===
db = SQLAlchemy(app)
jwt = JWTManager(app)

# === LOAD MODELS ===
risk_model = joblib.load("models/risk_model.joblib")
savings_model = joblib.load("models/savings_model.joblib")

# === FEATURE LISTS ===
RISK_FEATURES = [
    "income",
    "loan_repayment_history",
    "savings_amount",
    "contribution_frequency_biweekly",
    "contribution_frequency_monthly",
    "contribution_frequency_weekly"
]

SAVINGS_FEATURES = [
    "income",
    "loan_repayment_history",
    "past_savings",
    "contribution_frequency_biweekly",
    "contribution_frequency_monthly",
    "contribution_frequency_weekly"
]

def encode_frequency(freq):
    return {
        "contribution_frequency_biweekly": int(freq == "biweekly"),
        "contribution_frequency_monthly": int(freq == "monthly"),
        "contribution_frequency_weekly": int(freq == "weekly"),
    }

# === DB MODELS: User & Member ===
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=True)
    password_hash = db.Column(db.String(200), nullable=False)
    group_name = db.Column(db.String(200), nullable=True)

    members = db.relationship('Member', backref='owner', lazy=True)

class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    phone = db.Column(db.String(50), nullable=True)
    contribution = db.Column(db.Float, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# === AUTH ENDPOINTS ===
@app.route("/register", methods=["POST"])
def register():
    data = request.json or {}
    username = data.get("username")
    password = data.get("password")
    email = data.get("email", None)
    group_name = data.get("group_name", None)

    if not username or not password:
        return jsonify({"msg": "username and password required"}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"msg": "user with that username/email already exists"}), 400

    pw_hash = generate_password_hash(password)
    user = User(username=username, email=email, password_hash=pw_hash, group_name=group_name)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "user created"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"msg": "username and password required"}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"msg": "invalid credentials"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token, "user_id": user.id, "username": user.username})

# === MEMBERS CRUD - protected by JWT ===
@app.route("/members", methods=["GET"])
@jwt_required()
def list_members():
    user_id = int(get_jwt_identity())
    members = Member.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": m.id, "name": m.name, "phone": m.phone, "contribution": m.contribution} for m in members])

@app.route("/members", methods=["POST"])
@jwt_required()
def add_member():
    user_id = int(get_jwt_identity())
    data = request.json or {}
    name = data.get("name")
    phone = data.get("phone", "")
    contribution = float(data.get("contribution", 0))
    if not name:
        return jsonify({"msg": "member name required"}), 400
    member = Member(name=name, phone=phone, contribution=contribution, user_id=user_id)
    db.session.add(member)
    db.session.commit()
    return jsonify({"msg": "member added", "member": {"id": member.id, "name": member.name}}), 201

@app.route("/members/<int:member_id>", methods=["PUT", "PATCH"])
@jwt_required()
def update_member(member_id):
    user_id = int(get_jwt_identity())
    member = Member.query.filter_by(id=member_id, user_id=user_id).first()
    if not member:
        return jsonify({"msg": "not found"}), 404
    data = request.json or {}
    member.name = data.get("name", member.name)
    member.phone = data.get("phone", member.phone)
    member.contribution = float(data.get("contribution", member.contribution))
    db.session.commit()
    return jsonify({"msg": "member updated"})

@app.route("/members/<int:member_id>", methods=["DELETE"])
@jwt_required()
def delete_member(member_id):
    user_id = int(get_jwt_identity())
    member = Member.query.filter_by(id=member_id, user_id=user_id).first()
    if not member:
        return jsonify({"msg": "not found"}), 404
    db.session.delete(member)
    db.session.commit()
    return jsonify({"msg": "member deleted"})

# === MORE ENDPOINTS ===
@app.route("/predict_risk", methods=["POST"])
def predict_risk():
    data = request.json
    freq_encoded = encode_frequency(data.get("contribution_frequency", ""))
    input_data = {
        "income": data["income"],
        "loan_repayment_history": data["loan_repayment_history"],
        "savings_amount": data["savings_amount"],
        **freq_encoded
    }
    df = pd.DataFrame([input_data], columns=RISK_FEATURES)
    prediction = risk_model.predict(df)[0]
    return jsonify({"risk_prediction": int(prediction)})

@app.route("/forecast_savings", methods=["POST"])
def forecast_savings():
    data = request.json
    freq_encoded = encode_frequency(data.get("contribution_frequency", ""))
    input_data = {
        "income": data["income"],
        "loan_repayment_history": data["loan_repayment_history"],
        "past_savings": data["past_savings"],
        **freq_encoded
    }
    df = pd.DataFrame([input_data], columns=SAVINGS_FEATURES)
    prediction = savings_model.predict(df)[0]
    return jsonify({"predicted_savings_next_month": round(float(prediction), 2)})

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ChamaSense Flask API is up and running "})

@app.route("/summary", methods=["GET"])
def summary():
    data = {
        "total_members": User.query.count() if User.query.count() else 42,
        "savings_balance": 1200000,
        "pending_loans": 3,
        "last_activity": "Today",
    }
    return jsonify(data)

@app.route("/loans", methods=["GET"])
def get_loans():
    loans = [
        {
            "member_name": "Alice Mwangi",
            "amount": 50000,
            "status": "Pending",
            "due_date": "2025-08-15"
        },
        {
            "member_name": "Brian Otieno",
            "amount": 75000,
            "status": "Approved",
            "due_date": "2025-09-01"
        },
        {
            "member_name": "Cynthia Wambui",
            "amount": 30000,
            "status": "Overdue",
            "due_date": "2025-07-10"
        }
    ]
    return jsonify(loans)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
