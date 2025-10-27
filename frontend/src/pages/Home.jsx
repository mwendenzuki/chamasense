import { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await fetch("https://chamasense.onrender.com");
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading) return <p>Loading summary...</p>;
  if (!summary) return <p>Could not load data. Try again later.</p>;

  return (
    <div className="home">
      <h2 className="title">Dashboard Summary</h2>
      <div className="summary-grid">
        <div className="card">
          <h3>Total Members</h3>
          <p>{summary.total_members}</p>
        </div>
        <div className="card">
          <h3>Savings Balance</h3>
          <p>KES {summary.savings_balance.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Pending Loans</h3>
          <p>{summary.pending_loans}</p>
        </div>
        <div className="card">
          <h3>Last Activity</h3>
          <p>{summary.last_activity}</p>
        </div>
      </div>
    </div>
  );
}
