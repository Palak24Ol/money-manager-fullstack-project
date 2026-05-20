import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CustomLineChart from "./CustomLineChart.jsx";
import { prepareIncomeLineChartData } from "../util/util.js";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
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
            Expense Overview
          </h5>
          <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
            Track your spending trends
          </p>
          <p className="text-2xl font-extrabold mt-2" style={{ color: "#F05D73", letterSpacing: "-0.5px" }}>
            ₹{total.toLocaleString("en-IN")}
          </p>
        </div>
        <button className="add-btn" onClick={onExpenseIncome}>
          <Plus size={15} /> Add Expense
        </button>
      </div>
      <CustomLineChart data={chartData} />
    </div>
  );
};

export default ExpenseOverview;