import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => { setLoading(true); try { await onEmail(); } finally { setLoading(false); } };
  const handleDownload = async () => { setLoading(true); try { await onDownload(); } finally { setLoading(false); } };

  return (
    <div className="card animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h5 className="font-extrabold text-base" style={{ color: "#1A2332" }}>Expense Records</h5>
          <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
            {transactions?.length || 0} records
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button disabled={loading} className="card-btn" onClick={handleEmail}>
            {loading ? <LoaderCircle size={14} className="animate-spin" /> : <Mail size={14} />}
            {loading ? "Sending..." : "Email"}
          </button>
          <button disabled={loading} className="card-btn" onClick={handleDownload}>
            {loading ? <LoaderCircle size={14} className="animate-spin" /> : <Download size={14} />}
            {loading ? "Exporting..." : "Export"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense.id}
            title={expense.name}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense.id)}
          />
        ))}
        {(!transactions || transactions.length === 0) && (
          <div className="col-span-2 text-center py-14">
            <div style={{ fontSize: "48px" }} className="mb-3">💸</div>
            <p className="font-bold" style={{ color: "#9CA3AF" }}>No expense records yet</p>
            <p className="text-xs mt-1" style={{ color: "#C4B8A8" }}>Add your first expense above</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;