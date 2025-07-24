// src/components/Card.jsx
export default function Card({ title, children }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow space-y-1">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
