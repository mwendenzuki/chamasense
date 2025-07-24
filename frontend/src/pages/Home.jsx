// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getSummary } from "../components/api.js";
import "./Home.module.css";

export default function Home() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSummary();
        setSummary(data);
      } catch (err) {
        console.error("Error loading summary:", err);
      }
    }
    fetchData();
  }, []);

  if (!summary) return <p>Loading summary...</p>;

  return (
    <div className="home-page">
      <div className="home-cards-grid">
        <Card title="Total Members">{summary.total_members}</Card>
        <Card title="Savings Balance">
          KES {summary.savings_balance.toLocaleString()}
        </Card>
        <Card title="Pending Loans">{summary.pending_loans}</Card>
        <Card title="Last Activity">{summary.last_activity}</Card>
      </div>
    </div>
  );
}
