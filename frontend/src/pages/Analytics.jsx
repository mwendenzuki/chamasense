import { useState } from "react";
import "./Analytics.css";

export default function Analytics() {
  // --- Forms State ---
  const [riskData, setRiskData] = useState({
    income: "",
    loan_repayment_history: "",
    savings_amount: "",
    contribution_frequency: "monthly",
  });

  const [savingsData, setSavingsData] = useState({
    income: "",
    loan_repayment_history: "",
    past_savings: "",
    contribution_frequency: "monthly",
  });

  const [riskResult, setRiskResult] = useState(null);
  const [savingsResult, setSavingsResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Handle Input Changes ---
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "risk") setRiskData({ ...riskData, [name]: value });
    else setSavingsData({ ...savingsData, [name]: value });
  };

  // --- Submit Risk Prediction ---
  const handleRiskSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/predict_risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(riskData),
      });
      const data = await res.json();
      setRiskResult(data.risk_prediction);
    } catch (err) {
      console.error("Risk prediction failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Submit Savings Forecast ---
  const handleSavingsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/forecast_savings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savingsData),
      });
      const data = await res.json();
      setSavingsResult(data.predicted_savings_next_month);
    } catch (err) {
      console.error("Forecast failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Helper for interpreting risk ---
  const interpretRisk = (value) => {
    if (value === 0) return { label: "Low Risk", color: "#2e7d32" };
    if (value === 1) return { label: "Medium Risk", color: "#f9a825" };
    if (value === 2) return { label: "High Risk", color: "#c62828" };
    return { label: "Unknown", color: "#616161" };
  };

  const riskLevel = riskResult !== null ? interpretRisk(riskResult) : null;

  return (
    <div className="analytics-page">
      <h1>AI Insights & Predictions</h1>
      <p className="subtitle">
        Predict risk and forecast savings using machine learning intelligence.
      </p>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h2>Risk Prediction</h2>
          <form onSubmit={handleRiskSubmit}>
            <input
              type="number"
              name="income"
              placeholder="Income"
              value={riskData.income}
              onChange={(e) => handleChange(e, "risk")}
              required
            />
            <input
              type="number"
              name="loan_repayment_history"
              placeholder="Loan Repayment Score (1–10)"
              value={riskData.loan_repayment_history}
              onChange={(e) => handleChange(e, "risk")}
              required
            />
            <input
              type="number"
              name="savings_amount"
              placeholder="Current Savings"
              value={riskData.savings_amount}
              onChange={(e) => handleChange(e, "risk")}
              required
            />
            <select
              name="contribution_frequency"
              value={riskData.contribution_frequency}
              onChange={(e) => handleChange(e, "risk")}
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Calculating..." : "Predict Risk"}
            </button>
          </form>

          {riskResult !== null && (
            <div
              className="result-box"
              style={{ borderColor: riskLevel.color }}
            >
              <p style={{ color: riskLevel.color }}>
                <strong>{riskLevel.label}</strong>
              </p>
            </div>
          )}
        </div>

        <div className="analytics-card">
          <h2>Savings Forecast</h2>
          <form onSubmit={handleSavingsSubmit}>
            <input
              type="number"
              name="income"
              placeholder="Income"
              value={savingsData.income}
              onChange={(e) => handleChange(e, "savings")}
              required
            />
            <input
              type="number"
              name="loan_repayment_history"
              placeholder="Loan Repayment Score (1–10)"
              value={savingsData.loan_repayment_history}
              onChange={(e) => handleChange(e, "savings")}
              required
            />
            <input
              type="number"
              name="past_savings"
              placeholder="Past Savings"
              value={savingsData.past_savings}
              onChange={(e) => handleChange(e, "savings")}
              required
            />
            <select
              name="contribution_frequency"
              value={savingsData.contribution_frequency}
              onChange={(e) => handleChange(e, "savings")}
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Predicting..." : "Forecast Savings"}
            </button>
          </form>

          {savingsResult !== null && (
            <div className="result-box success">
              <p>
                Predicted Savings (Next Month):{" "}
                <strong>KES {savingsResult.toLocaleString()}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
