import { useState, useRef, useEffect, useContext } from "react";
import { User, LogOut, X, Menu, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import Sidebar from "./Sidebar.jsx";

const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { clearUser, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
    };
    if (showDropdown) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <div
      style={{ background: "white", borderBottom: "2px solid #F7F2EB" }}
      className="flex items-center justify-between gap-5 py-4 px-4 sm:px-7 sticky top-0 z-30"
    >
      {/* Left: hamburger + logo */}
      <div className="flex items-center gap-3">
        <button
          className="block lg:hidden p-2 rounded-xl transition-colors"
          style={{ background: "#F7F2EB" }}
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#F05D73,#C4435A)" }}
          >
            <Wallet size={18} color="white" />
          </div>
          <span
            className="text-lg font-extrabold"
            style={{ color: "#1A2332", letterSpacing: "-0.5px" }}
          >
            TrackMyMoney
          </span>
        </div>
      </div>

      {/* Right: user avatar */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2.5 py-2 px-3 rounded-2xl transition-all"
          style={{ background: "#F7F2EB" }}
        >
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="profile"
              className="w-8 h-8 rounded-xl object-cover"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "#2D8F7B" }}
            >
              <User size={16} color="white" />
            </div>
          )}
          <span
            className="text-sm font-bold hidden sm:block"
            style={{ color: "#1A2332" }}
          >
            {user?.fullName?.split(" ")[0] || "User"}
          </span>
        </button>

        {showDropdown && (
          <div
            className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border py-2 z-50 animate-fade-in"
            style={{ borderColor: "#F7F2EB", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: "#F7F2EB" }}>
              <p className="text-sm font-bold" style={{ color: "#1A2332" }}>
                {user?.fullName}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
                {user?.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold transition-colors"
              style={{ color: "#F05D73" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#FDEEF1")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile slide-down sidebar */}
      {openSideMenu && (
        <div
          className="fixed top-[65px] left-0 right-0 bg-white border-b lg:hidden z-20"
          style={{ borderColor: "#F7F2EB" }}
        >
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Menubar;