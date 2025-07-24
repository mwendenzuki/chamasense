import { useState } from "react";
import { forecastSavings } from "./api.js";

export default function ForecastForm() {
  const [formData, setFormData] = useState({
    income: 50000,
    contribution_frequency: "monthly",
    loan_repayment_history: 0.8,
    savings_amount: 10000,
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prediction = await forecastSavings(formData);
    setResult(prediction.predicted_savings_next_month);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      {/* Input fields - can be reused or abstracted if needed */}
      <input
        type="number"
        placeholder="Income"
        value={formData.income}
        onChange={(e) =>
          setFormData({ ...formData, income: parseInt(e.target.value) })
        }
        className="w-full p-2 border"
      />
      <select
        value={formData.contribution_frequency}
        onChange={(e) =>
          setFormData({ ...formData, contribution_frequency: e.target.value })
        }
        className="w-full p-2 border"
      >
        <option value="weekly">Weekly</option>
        <option value="biweekly">Biweekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <input
        type="number"
        step="0.01"
        placeholder="Loan Repayment History"
        value={formData.loan_repayment_history}
        onChange={(e) =>
          setFormData({
            ...formData,
            loan_repayment_history: parseFloat(e.target.value),
          })
        }
        className="w-full p-2 border"
      />
      <input
        type="number"
        placeholder="Savings Amount"
        value={formData.savings_amount}
        onChange={(e) =>
          setFormData({ ...formData, savings_amount: parseInt(e.target.value) })
        }
        className="w-full p-2 border"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Forecast Savings
      </button>

      {result && (
        <p className="text-lg mt-4">
          Predicted Savings Next Month: KES {result}
        </p>
      )}
    </form>
  );
}
