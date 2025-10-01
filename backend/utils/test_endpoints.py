import requests

BASE_URL = "http://127.0.0.1:5000"

def safe_print(label, res):
    print(f"{label}: {res.status_code}")
    try:
        print(res.json())
    except Exception:
        print("Raw response:", res.text)

# Health Check (this is just "/")
res = requests.get(f"{BASE_URL}/")
safe_print("Health Check", res)

# Summary
res = requests.get(f"{BASE_URL}/summary")
safe_print("Summary", res)

# Loans
res = requests.get(f"{BASE_URL}/loans")
safe_print("Loans", res)

# Predict Risk
res = requests.post(f"{BASE_URL}/predict_risk", json={
    "income": 20000,
    "loan_repayment_history": 1,
    "savings_amount": 5000,
    "contribution_frequency": "monthly"
})
safe_print("Risk Prediction", res)

# Forecast Savings
res = requests.post(f"{BASE_URL}/forecast_savings", json={
    "income": 20000,
    "loan_repayment_history": 1,
    "past_savings": 15000,
    "contribution_frequency": "monthly"
})
safe_print("Forecast Savings", res)
