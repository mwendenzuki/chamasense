// src/api.js
const BASE_URL = "http://127.0.0.1:5000";

export async function predictRisk(data) {
  const res = await fetch(`${BASE_URL}/predict_risk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function forecastSavings(data) {
  const res = await fetch(`${BASE_URL}/forecast_savings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getSummary() {
  const res = await fetch(`${BASE_URL}/summary`);
  if (!res.ok) throw new Error("Failed to fetch summary data");
  return res.json();
}

export async function getLoans() {
  const res = await fetch(`${BASE_URL}/loans`);
  if (!res.ok) throw new Error("Failed to fetch loans");
  return res.json();
}
