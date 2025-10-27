import { useEffect, useState } from "react";
import "./Reports.css";

export default function Reports() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("https://chamasense.onrender.com");
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error("Error fetching summary:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  if (loading) return <p className="loading">Loading financial report...</p>;
  if (!summary) return <p className="error">Unable to load data.</p>;

  return (
    <div className="reports-page">
      <h1>Monthly Financial Report</h1>
      <p className="subtitle">
        A summary of Chama performance, savings growth, and loan activity.
      </p>

      <section className="report-section">
        <h2>Overview</h2>
        <table>
          <tbody>
            <tr>
              <td>Total Members</td>
              <td>{summary.total_members}</td>
            </tr>
            <tr>
              <td>Group Savings Balance</td>
              <td>KES {summary.savings_balance.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Pending Loans</td>
              <td>{summary.pending_loans}</td>
            </tr>
            <tr>
              <td>Last Recorded Activity</td>
              <td>{summary.last_activity}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="report-section">
        <h2>Performance Insights</h2>
        <ul>
          <li>
            Average savings per member:{" "}
            <strong>
              KES{" "}
              {(summary.savings_balance / summary.total_members).toLocaleString(
                undefined,
                { maximumFractionDigits: 0 }
              )}
            </strong>
          </li>
          <li>
            Loan-to-savings ratio:{" "}
            <strong>
              {(
                ((summary.pending_loans * 50000) / summary.savings_balance) *
                100
              ).toFixed(1)}
              %
            </strong>
          </li>
        </ul>
      </section>

      <footer className="report-footer">
        <p>Generated automatically by ChamaSense Analytics</p>
      </footer>
    </div>
  );
}
