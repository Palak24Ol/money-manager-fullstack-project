const THEMES = {
  "bg-purple-800": {
    bg: "linear-gradient(135deg,#7C3AED,#5B21B6)",
    shadow: "rgba(124,58,237,0.3)",
    lightBg: "#F5F3FF",
    textColor: "#5B21B6",
    emoji: "💰",
  },
  "bg-green-800": {
    bg: "linear-gradient(135deg,#2D8F7B,#1E6B5E)",
    shadow: "rgba(45,143,123,0.3)",
    lightBg: "#E4F5F2",
    textColor: "#1E6B5E",
    emoji: "📈",
  },
  "bg-red-800": {
    bg: "linear-gradient(135deg,#F05D73,#C4435A)",
    shadow: "rgba(240,93,115,0.3)",
    lightBg: "#FDEEF1",
    textColor: "#C4435A",
    emoji: "📉",
  },
};

const InfoCard = ({ icon, label, value, color }) => {
  const theme = THEMES[color] || THEMES["bg-purple-800"];

  return (
    <div className="card animate-fade-in-up relative overflow-hidden" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Decorative circle */}
      <div
        className="absolute -top-5 -right-5 w-24 h-24 rounded-full opacity-[0.08]"
        style={{ background: theme.bg }}
      />

      <div className="flex items-center justify-between">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: theme.bg, boxShadow: `0 4px 14px ${theme.shadow}` }}
        >
          <span style={{ color: "white", fontSize: "20px" }}>{theme.emoji}</span>
        </div>
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-xl"
          style={{ background: theme.lightBg, color: theme.textColor }}
        >
          This month
        </span>
      </div>

      <div>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: "#9CA3AF" }}
        >
          {label}
        </p>
        <h3
          className="text-2xl font-extrabold"
          style={{ color: "#1A2332", letterSpacing: "-0.5px" }}
        >
          ₹{value}
        </h3>
      </div>
    </div>
  );
};

export default InfoCard;