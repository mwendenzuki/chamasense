// src/pages/Loans.jsx
import { useEffect, useState } from "react";
import { getLoans } from "../components/api";
import "./Loans.module.css";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLoans() {
      try {
        const data = await getLoans();
        setLoans(data);
      } catch (err) {
        console.error("Error loading loans:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLoans();
  }, []);

  if (loading) return <p>Loading loans...</p>;
  if (!loans.length) return <p>No active loans.</p>;

  return (
    <div className="loans-page">
      <h2 className="loans-title">Active Loans</h2>
      <table className="loans-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <tr key={index}>
              <td>{loan.member_name}</td>
              <td>KES {loan.amount.toLocaleString()}</td>
              <td>{loan.status}</td>
              <td>{loan.due_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
