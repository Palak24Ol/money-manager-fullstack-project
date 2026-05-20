import CustomPieChart from "./CustomPieChart.jsx";
import { addThousandsSeparator } from "../util/util.js";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#7C3AED", "#F05D73", "#2D8F7B"];

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  const savingsRate =
    totalIncome > 0
      ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
      : 0;

  return (
    <div className="card animate-fade-in-up">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h5 className="font-extrabold text-base" style={{ color: "#1A2332" }}>
            Financial Overview
          </h5>
          <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>Balance breakdown</p>
        </div>
        <span
          className="text-xs font-extrabold px-3 py-1.5 rounded-xl"
          style={{
            background: savingsRate >= 0 ? "#E4F5F2" : "#FDEEF1",
            color: savingsRate >= 0 ? "#1E6B5E" : "#C4435A",
          }}
        >
          {savingsRate >= 0 ? "+" : ""}{savingsRate}% saved
        </span>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;