import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const features = [
    { icon: <TrendingUp size={16} />, text: "Real-time tracking" },
    { icon: <Shield size={16} />, text: "100% secure" },
    { icon: <Zap size={16} />, text: "Instant insights" },
  ];

  return (
    <section className="text-center py-24 md:py-36 px-4" style={{ background: "linear-gradient(180deg,#F7F2EB 0%,white 100%)" }}>
      <div className="container mx-auto max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-8"
          style={{ background: "#E4F5F2", color: "#1E6B5E" }}>
          ✨ Smart Money Management
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6" style={{ color: "#1A2332", lineHeight: "1.1" }}>
          Take Control of Your{" "}
          <span style={{ color: "#F05D73" }}>Finances</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
          Effortlessly track income and expenses, visualize your spending, and hit your financial goals — all in one place.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{ background: "white", color: "#6B7280", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <span style={{ color: "#2D8F7B" }}>{f.icon}</span>
              {f.text}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup"
            className="text-base font-extrabold px-8 py-4 rounded-2xl text-white transition-all"
            style={{ background: "linear-gradient(135deg,#F05D73,#C4435A)", boxShadow: "0 6px 20px rgba(240,93,115,0.4)" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            Start Tracking for Free
          </Link>
          <Link to="/login"
            className="text-base font-extrabold px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
            style={{ background: "white", color: "#1A2332", boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}
          >
            Login <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;