import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Wallet } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header className="bg-white" style={{ borderBottom: "2px solid #F7F2EB" }}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#F05D73,#C4435A)" }}
            >
              <Wallet size={20} color="white" />
            </div>
            <span className="text-lg font-extrabold" style={{ color: "#1A2332", letterSpacing: "-0.5px" }}>
              TrackMyMoney
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-sm font-bold transition-colors"
                style={{ color: "#6B7280" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2D8F7B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-bold px-4 py-2 rounded-2xl transition-all"
                style={{ color: "#2D8F7B", background: "#E4F5F2" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(45,143,123,0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#E4F5F2")}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-bold px-5 py-2.5 rounded-2xl text-white transition-all"
                style={{ background: "linear-gradient(135deg,#F05D73,#C4435A)", boxShadow: "0 4px 12px rgba(240,93,115,0.35)" }}
              >
                Get Started
              </Link>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl"
              style={{ background: "#F7F2EB" }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="lg:hidden border-t px-6 py-4 space-y-3" style={{ borderColor: "#F7F2EB" }}>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.to} className="block text-sm font-bold py-2" style={{ color: "#6B7280" }}>
              {link.name}
            </Link>
          ))}
          <div className="flex gap-3 pt-3 border-t" style={{ borderColor: "#F7F2EB" }}>
            <Link to="/login" className="flex-1 text-center text-sm font-bold py-2.5 rounded-2xl" style={{ color: "#2D8F7B", background: "#E4F5F2" }}>
              Login
            </Link>
            <Link to="/signup" className="flex-1 text-center text-sm font-bold py-2.5 rounded-2xl text-white" style={{ background: "linear-gradient(135deg,#F05D73,#C4435A)" }}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;