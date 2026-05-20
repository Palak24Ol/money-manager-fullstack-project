import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util.js";
import CustomLineChart from "./CustomLineChart.jsx";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  const total = transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;

  return (
    <div className="card animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h5 className="font-extrabold text-base" style={{ color: "#1A2332" }}>
            Income Overview
          </h5>
          <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
            Track your earnings over time
          </p>
          <p className="text-2xl font-extrabold mt-2" style={{ color: "#2D8F7B", letterSpacing: "-0.5px" }}>
            ₹{total.toLocaleString("en-IN")}
          </p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <Plus size={15} /> Add Income
        </button>
      </div>
      <CustomLineChart data={chartData} />
    </div>
  );
};

export default IncomeOverview;