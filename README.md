# 🌍 ChamaSense – AI-Powered Group Savings Manager

🔗 URL – https://chamasense.onrender.com

---

## 📖 Overview

**ChamaSense** is an intelligent financial management platform built to empower community savings groups (_Chamas_).  
It simplifies contribution tracking, risk assessment, and financial forecasting — using machine learning to provide actionable insights that help members grow their collective wealth smarter and faster.

---

## 🚀 Features

✅ **AI-Powered Forecasting** – Predict individual and group savings growth  
✅ **Risk Assessment** – Evaluate loan repayment probability via ML models  
✅ **Member Management** – Add, edit, and track contributions in real-time  
✅ **Financial Reports Dashboard** – Visual insights for better decision-making  
✅ **Secure Authentication** – JWT-based user login & registration  
✅ **Responsive UI** – Clean and intuitive design for all devices

---

## 🛠️ Tech Stack

| Layer          | Tools & Frameworks                   |
| -------------- | ------------------------------------ |
| **Frontend**   | React 19.1, Vite, pnpm, External CSS |
| **Backend**    | Flask (Python), Flask-JWT-Extended   |
| **AI/ML**      | scikit-learn, pandas, joblib         |
| **Deployment** | Render (Backend + Frontend)          |

---

## 📂 Folder Structure

```bash
chamasense
├── app.py
├── frontend
├── instance
├── models
├── __pycache__
├── README.md
├── requirements.txt
├── utils
└── venv
```

---

## 🧪 Running Locally

### 🖥 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: .\venv\Scripts\activate
pip install -r requirements.txt
python app.py
(The Flask app will start on: http://127.0.0.1:5000)
```

### 💻 Frontend Setup

```bash
cd frontend
pnpm install
pnpm dev
(The frontend will start on: http://localhost:5173)
```

## 🧠 AI Model Usage

The system integrates custom-trained ML models to analyze and predict financial behavior for Chama members.

### Features Used:

- Income level
- Loan repayment history
- Contribution frequency
- Historical savings performance

### Models:

- risk_model.joblib → Predicts loan repayment risk

- savings_model.joblib → Forecasts savings potential

## ✨ Future Improvements

- 🚀 Real-time notifications via WebSockets
- 📱 Integration with mobile money APIs (M-Pesa, Airtel Money)
- 🔐 Role-based access control (Admin, Treasurer, Member)
- 📊 Enhanced analytics & trend visualization
- 🤖 Deeper AI integration for personalized financial advice

## 🧩 Deployment (Render)

Both backend and frontend are deployed on Render Cloud

## 💡 Author

👩‍💻 Dede

- Frontend Developer & Aspiring Full Stack Engineer
- 💬 "Empowering communities, one Chama at a time."
