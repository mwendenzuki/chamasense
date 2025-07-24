// src/components/LoanItem.jsx
export default function LoanItem({ name, amount, status }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-1">
      <p>
        <strong>Member:</strong> {name}
      </p>
      <p>
        <strong>Amount:</strong> KES {amount}
      </p>
      <p>
        <strong>Status:</strong> <span className="capitalize">{status}</span>
      </p>
    </div>
  );
}
