import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const GRADIENTS = [
  "linear-gradient(135deg,#F05D73,#C4435A)",
  "linear-gradient(135deg,#2D8F7B,#1E6B5E)",
  "linear-gradient(135deg,#F5B731,#D99B1A)",
  "linear-gradient(135deg,#7C3AED,#5B21B6)",
  "linear-gradient(135deg,#2D8F7B,#1E6B5E)",
];
const ICON_COLORS = ["#F05D73","#2D8F7B","#F5B731","#7C3AED","#2D8F7B"];

const Sidebar = ({ activeMenu }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className="w-64 h-[calc(100vh-65px)] bg-white p-5 sticky top-[65px] z-20 overflow-y-auto"
      style={{ borderRight: "2px solid #F7F2EB" }}
    >
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 mt-2 mb-8">
        <div className="relative">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="profile"
              className="w-16 h-16 rounded-2xl object-cover"
              style={{ boxShadow: "0 4px 12px rgba(240,93,115,0.25)" }}
            />
          ) : (
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,#2D8F7B,#1E6B5E)",
                boxShadow: "0 4px 12px rgba(45,143,123,0.3)",
              }}
            >
              <User size={28} color="white" />
            </div>
          )}
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
            style={{ background: "#2D8F7B" }}
          />
        </div>
        <div className="text-center">
          <h5 className="font-extrabold text-sm" style={{ color: "#1A2332" }}>
            {user?.fullName || ""}
          </h5>
          <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
            Personal Account
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav>
        {SIDE_BAR_DATA.map((item, i) => {
          const isActive = activeMenu === item.label;
          return (
            <button
              key={`menu_${i}`}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 text-sm font-bold py-3 px-4 rounded-2xl mb-2 transition-all duration-200 cursor-pointer"
              style={
                isActive
                  ? { background: GRADIENTS[i % GRADIENTS.length], color: "white", boxShadow: "0 4px 12px rgba(240,93,115,0.28)" }
                  : { color: "#6B7280", background: "transparent" }
              }
              onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "#F7F2EB"; e.currentTarget.style.color = "#1A2332"; }}}
              onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6B7280"; }}}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={isActive ? { background: "rgba(255,255,255,0.25)" } : { background: "#F7F2EB" }}
              >
                <item.icon size={16} color={isActive ? "white" : ICON_COLORS[i % ICON_COLORS.length]} />
              </div>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Tip card */}
      <div
        className="mt-6 p-4 rounded-2xl"
        style={{ background: "linear-gradient(135deg,#E4F5F2,#F7F2EB)" }}
      >
        <p className="text-xs font-bold" style={{ color: "#2D8F7B" }}>💡 Pro Tip</p>
        <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
          Track daily expenses to save up to 20% more.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;