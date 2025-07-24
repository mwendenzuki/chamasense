from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load models
risk_model = joblib.load("models/risk_model.joblib")
savings_model = joblib.load("models/savings_model.joblib")

# Define expected features
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

# One-hot encoding helper
def encode_frequency(freq):
    return {
        "contribution_frequency_biweekly": int(freq == "biweekly"),
        "contribution_frequency_monthly": int(freq == "monthly"),
        "contribution_frequency_weekly": int(freq == "weekly"),
    }

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
        "total_members": 42,
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
    app.run(debug=True)
