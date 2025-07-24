# 📌 Project: ChamaSense – AI-Powered Group Savings Manager

## 📖 Overview

ChamaSense is an intelligent web platform designed to simplify and empower community savings groups (Chamas). It leverages AI to assess risk and forecast savings, offering insights for informed financial decisions.

## 🚀 Features

💰 Predict individual savings potential

📉 Assess loan repayment risk using machine learning

🧠 AI-backed financial forecasting

🧾 Reports dashboard for contributions and savings

⚙️ Group settings management

## 🛠️ Tech Stack

Frontend: React 19.1, CSS Modules, Vite, pnpm

Backend: Flask (Python), joblib, pandas, scikit-learn

AI/ML: Custom-trained models for risk_prediction and forecast_savings

Deployment:

## 📂 Folder Structure

chamasense/
├── backend/
│ ├── app.py
│ ├── models/
│ └── utils/
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ └── styles/
└── README.md

## 🧪 Running Locally

### Backend

cd backend
source venv/bin/activate # or use `.\venv\Scripts\activate` on Windows
pip install -r requirements.txt
python app.py

### Frontend

cd frontend
pnpm install
pnpm dev

## 🧠 AI Model Usage

Trained on synthetic and real-world-inspired financial data

Features used:

Income

Loan repayment history

Past savings

Contribution frequency (encoded)

Models:

risk_model.joblib

savings_model.joblib

## ✨ Future Improvements

Real-time notifications

Integration with mobile money APIs

Advanced fraud detection with anomaly detection

Role-based access control
