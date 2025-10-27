import requests

url = "https://chamasense.onrender.com/forecast_savings"

data = {
    "income": 50000,
    "contribution_frequency": "monthly",
    "loan_repayment_history": 0.8,
    "savings_amount": 10000
}

res = requests.post(url, json=data)

print("Predicted savings next month:", res.json())

