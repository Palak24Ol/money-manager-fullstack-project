import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const Transactions = ({ transactions, onMore, type, title }) => {
  const isIncome = type === "income";

  return (
    <div className="card animate-fade-in-up">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-lg"
            style={{ background: isIncome ? "#E4F5F2" : "#FDEEF1" }}
          >
            {isIncome ? "💰" : "💸"}
          </div>
          <div>
            <h5 className="font-extrabold text-base" style={{ color: "#1A2332" }}>{title}</h5>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>
              {transactions?.length || 0} entries
            </p>
          </div>
        </div>
        <button className="card-btn" onClick={onMore}>
          More <ArrowRight size={13} />
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
            type={type}
            hideDeleteBtn
          />
        ))}
        {(!transactions || transactions.length === 0) && (
          <div className="text-center py-6">
            <p className="text-sm font-bold" style={{ color: "#9CA3AF" }}>
              No {type} records yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;