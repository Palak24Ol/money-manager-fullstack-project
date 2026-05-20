import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { AppContext } from "../context/AppContext.jsx";
import { LoaderCircle, Wallet } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) { setError("Please enter a valid email address"); setIsLoading(false); return; }
    if (!password.trim()) { setError("Please enter your password"); setIsLoading(false); return; }
    setError("");

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, { email, password });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg,#F7F2EB 0%,#E4F5F2 50%,#FDEEF1 100%)" }}>
      {/* Blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle,#F05D73,transparent)" }} />
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full opacity-20 translate-x-1/2 translate-y-1/2"
        style={{ background: "radial-gradient(circle,#2D8F7B,transparent)" }} />

      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#F05D73,#C4435A)", boxShadow: "0 6px 20px rgba(240,93,115,0.4)" }}>
              <Wallet size={24} color="white" />
            </div>
            <span className="text-2xl font-extrabold" style={{ color: "#1A2332" }}>TrackMyMoney</span>
          </div>
        </div>

        <div className="card" style={{ padding: "36px" }}>
          <h3 className="text-2xl font-extrabold text-center mb-1" style={{ color: "#1A2332" }}>Welcome back 👋</h3>
          <p className="text-sm text-center mb-8" style={{ color: "#9CA3AF" }}>Enter your details to continue</p>

          <form onSubmit={handleSubmit}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" placeholder="name@example.com" type="text" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="••••••••" type="password" />

            {error && (
              <div className="mb-4 p-3 rounded-2xl text-sm font-bold text-center" style={{ background: "#FDEEF1", color: "#C4435A" }}>
                {error}
              </div>
            )}

            <button disabled={isLoading} className="btn-primary" type="submit" style={{ opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? <><LoaderCircle size={18} className="animate-spin" /> Logging in...</> : "LOGIN"}
            </button>

            <p className="text-sm text-center mt-6" style={{ color: "#6B7280" }}>
              Don't have an account?{" "}
              <Link to="/signup" className="font-extrabold" style={{ color: "#F05D73" }}>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;