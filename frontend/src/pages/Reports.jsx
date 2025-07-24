import RiskForm from "../components/RiskForm";
import ForecastForm from "../components/ForecastForm";
import "./Reports.module.css";

export default function Reports() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Intelligent Reports
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-2xl shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Risk Prediction</h2>
          <RiskForm />
        </div>

        <div className="p-6 border rounded-2xl shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Savings Forecast</h2>
          <ForecastForm />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-primary text-white p-4 rounded">Primary</div>
        <div className="bg-accent text-dark p-4 rounded">Accent</div>
        <div className="bg-dark text-white p-4 rounded">Dark</div>
        <div className="bg-highlight text-dark p-4 rounded">Highlight</div>
      </div>
    </div>
  );
}
