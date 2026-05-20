import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div className="card animate-fade-in-up">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h4 className="font-extrabold text-base" style={{ color: "#1A2332" }}>
            Recent Transactions
          </h4>
          <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
            Your latest financial activity
          </p>
        </div>
        <button className="card-btn" onClick={onMore}>
          See all <ArrowRight size={13} />
        </button>
      </div>

      <div>
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
        {(!transactions || transactions.length === 0) && (
          <div className="text-center py-10">
            <div style={{ fontSize: "40px" }} className="mb-3">🧾</div>
            <p className="text-sm font-bold" style={{ color: "#9CA3AF" }}>No transactions yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;