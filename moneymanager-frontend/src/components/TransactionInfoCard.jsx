import { Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { addThousandsSeparator } from "../util/util.js";

const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete }) => {
  const isIncome = type === "income";

  return (
    <div
      className="group relative flex items-center gap-4 p-3 rounded-2xl transition-all duration-150"
      style={{ border: "1.5px solid transparent", cursor: "default" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isIncome ? "#E4F5F2" : "#FDEEF1";
        e.currentTarget.style.borderColor = isIncome ? "rgba(45,143,123,0.15)" : "rgba(240,93,115,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 flex items-center justify-center rounded-2xl flex-shrink-0 text-xl"
        style={{ background: isIncome ? "#E4F5F2" : "#FDEEF1" }}
      >
        {icon ? <img src={icon} alt={title} className="w-6 h-6" /> : (isIncome ? "💰" : "💸")}
      </div>

      {/* Text + Amount */}
      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: "#1A2332" }}>{title}</p>
          <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{date}</p>
        </div>

        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-xl"
              style={{ background: "#FDEEF1", color: "#F05D73" }}
            >
              <Trash2 size={14} />
            </button>
          )}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{
              background: isIncome ? "#E4F5F2" : "#FDEEF1",
              color: isIncome ? "#1E6B5E" : "#C4435A",
            }}
          >
            <span className="text-xs font-extrabold">
              {isIncome ? "+" : "-"}₹{addThousandsSeparator(amount)}
            </span>
            {isIncome ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;