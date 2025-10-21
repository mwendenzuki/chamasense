import { useEffect, useState } from "react";
import "./Loans.css";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLoans() {
      try {
        const res = await fetch("http://127.0.0.1:5000/loans");
        const data = await res.json();
        setLoans(data);
      } catch (err) {
        console.error("Error fetching loans:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLoans();
  }, []);

  if (loading) return <p>Loading loans...</p>;
  if (!loans.length) return <p>No loans found.</p>;

  return (
    <div className="loans">
      <h2 className="title">Loan Overview</h2>

      <table className="loan-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Amount (KES)</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <tr key={index} className={`status-${loan.status.toLowerCase()}`}>
              <td>{loan.member_name}</td>
              <td>{loan.amount.toLocaleString()}</td>
              <td>{loan.status}</td>
              <td>{loan.due_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
