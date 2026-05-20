import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Camera, Check, Edit3, LoaderCircle, Lock,
    Mail, Save, Trash2, User, X, Shield, Star, TrendingUp
} from "lucide-react";
import toast from "react-hot-toast";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { AppContext } from "../context/AppContext.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import uploadProfileImage from "../util/uploadProfileImage.js";

/* ─── tiny reusable stat card ─── */
const StatCard = ({ emoji, label, value, color }) => (
    <div
        className="flex flex-col items-center gap-1 p-4 rounded-2xl"
        style={{ background: color + "18", border: `1.5px solid ${color}22` }}
    >
        <span style={{ fontSize: 22 }}>{emoji}</span>
        <p className="text-lg font-extrabold" style={{ color }}>
            {value}
        </p>
        <p className="text-xs font-bold" style={{ color: "#9CA3AF" }}>
            {label}
        </p>
    </div>
);

const Profile = () => {
    useUser();
    const { user, setUser } = useContext(AppContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    /* ── form state ── */
    const [editMode, setEditMode] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [newPhotoFile, setNewPhotoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [saving, setSaving] = useState(false);
    const [dashboardData, setDashboardData] = useState(null);

    /* ── populate fields when user loads ── */
    useEffect(() => {
        if (user) {
            setFullName(user.fullName || "");
            setEmail(user.email || "");
        }
    }, [user]);

    /* ── fetch dashboard stats for the profile summary ── */
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
                if (res.status === 200) setDashboardData(res.data);
            } catch (_) {}
        };
        fetchStats();
    }, []);

    /* ── photo picker ── */
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setNewPhotoFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleRemovePhoto = () => {
        setNewPhotoFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    /* ── cancel edit ── */
    const handleCancel = () => {
        setFullName(user?.fullName || "");
        setEmail(user?.email || "");
        setNewPhotoFile(null);
        setPreviewUrl(null);
        setEditMode(false);
    };

    /* ── save ── */
    const handleSave = async () => {
        if (!fullName.trim()) { toast.error("Name cannot be empty"); return; }

        setSaving(true);
        try {
            let profileImageUrl = user?.profileImageUrl || "";

            /* upload new photo if chosen */
            if (newPhotoFile) {
                profileImageUrl = await uploadProfileImage(newPhotoFile);
            }

            const payload = { fullName: fullName.trim(), profileImageUrl };
            
const res = await axiosConfig.put(API_ENDPOINTS.UPDATE_PROFILE, payload);

            if (res.status === 200) {
                setUser({ ...user, fullName: fullName.trim(), profileImageUrl });
                setEditMode(false);
                setNewPhotoFile(null);
                setPreviewUrl(null);
                toast.success("Profile updated! 🎉");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    /* ── current avatar src ── */
    const avatarSrc = previewUrl || user?.profileImageUrl || null;

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
        : "Recently";

    return (
        <Dashboard activeMenu="Profile">
            <div className="my-6 max-w-3xl mx-auto space-y-5 stagger">

                {/* ── Card 1: Avatar + name + edit button ── */}
                <div className="card animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div
                                className="w-24 h-24 rounded-3xl overflow-hidden flex items-center justify-center"
                                style={{
                                    background: "linear-gradient(135deg,#2D8F7B,#1E6B5E)",
                                    boxShadow: "0 8px 24px rgba(45,143,123,0.35)",
                                }}
                            >
                                {avatarSrc ? (
                                    <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={38} color="white" />
                                )}
                            </div>

                            {/* Camera button — only in edit mode */}
                            {editMode && (
                                <>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute -bottom-2 -right-2 w-9 h-9 rounded-2xl flex items-center justify-center transition-all"
                                        style={{
                                            background: "linear-gradient(135deg,#F05D73,#C4435A)",
                                            boxShadow: "0 4px 10px rgba(240,93,115,0.4)",
                                            color: "white",
                                        }}
                                    >
                                        <Camera size={15} />
                                    </button>
                                    {previewUrl && (
                                        <button
                                            onClick={handleRemovePhoto}
                                            className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center"
                                            style={{ background: "#FDEEF1", color: "#F05D73" }}
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handlePhotoChange}
                                    />
                                </>
                            )}
                        </div>

                        {/* Name / email / badges */}
                        <div className="flex-1 text-center sm:text-left">
                            {editMode ? (
                                <input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="input-box text-xl font-extrabold mb-0"
                                    style={{ fontSize: "20px", fontWeight: 800, marginBottom: 0 }}
                                    placeholder="Full name"
                                />
                            ) : (
                                <h2
                                    className="text-2xl font-extrabold"
                                    style={{ color: "#1A2332", letterSpacing: "-0.5px" }}
                                >
                                    {user?.fullName || "—"}
                                </h2>
                            )}

                            <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                                <Mail size={14} style={{ color: "#9CA3AF" }} />
                                <span className="text-sm font-bold" style={{ color: "#6B7280" }}>
                                    {user?.email}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                                <span
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                                    style={{ background: "#E4F5F2", color: "#1E6B5E" }}
                                >
                                    <Star size={12} /> Personal Account
                                </span>
                                <span
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                                    style={{ background: "#F7F2EB", color: "#9CA3AF" }}
                                >
                                    <Shield size={12} /> Member since {memberSince}
                                </span>
                            </div>
                        </div>

                        {/* Edit / Save / Cancel buttons */}
                        <div className="flex flex-col gap-2 flex-shrink-0">
                            {!editMode ? (
                                <button
                                    className="add-btn"
                                    onClick={() => setEditMode(true)}
                                >
                                    <Edit3 size={14} /> Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="add-btn add-btn-fill"
                                        onClick={handleSave}
                                        disabled={saving}
                                        style={{ opacity: saving ? 0.7 : 1 }}
                                    >
                                        {saving ? (
                                            <><LoaderCircle size={14} className="animate-spin" /> Saving...</>
                                        ) : (
                                            <><Save size={14} /> Save</>
                                        )}
                                    </button>
                                    <button
                                        className="add-btn"
                                        onClick={handleCancel}
                                        style={{ color: "#F05D73", background: "#FDEEF1", borderColor: "rgba(240,93,115,0.2)" }}
                                    >
                                        <X size={14} /> Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Card 2: Financial summary stats ── */}
                <div className="card animate-fade-in-up">
                    <h4 className="font-extrabold text-base mb-4" style={{ color: "#1A2332" }}>
                        📊 Your Financial Summary
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                        <StatCard
                            emoji="💰"
                            label="Total Balance"
                            value={`₹${(dashboardData?.totalBalance || 0).toLocaleString("en-IN")}`}
                            color="#7C3AED"
                        />
                        <StatCard
                            emoji="📈"
                            label="Total Income"
                            value={`₹${(dashboardData?.totalIncome || 0).toLocaleString("en-IN")}`}
                            color="#2D8F7B"
                        />
                        <StatCard
                            emoji="📉"
                            label="Total Expense"
                            value={`₹${(dashboardData?.totalExpense || 0).toLocaleString("en-IN")}`}
                            color="#F05D73"
                        />
                    </div>
                </div>

                {/* ── Card 3: Account info (read-only fields) ── */}
                <div className="card animate-fade-in-up">
                    <h4 className="font-extrabold text-base mb-5" style={{ color: "#1A2332" }}>
                        🔐 Account Details
                    </h4>

                    <div className="space-y-3">
                        {/* Full name row */}
                        <div
                            className="flex items-center justify-between p-4 rounded-2xl"
                            style={{ background: "#F7F2EB" }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                                    style={{ background: "#E4F5F2" }}
                                >
                                    <User size={16} style={{ color: "#2D8F7B" }} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold" style={{ color: "#9CA3AF" }}>Full Name</p>
                                    <p className="text-sm font-extrabold" style={{ color: "#1A2332" }}>
                                        {user?.fullName || "—"}
                                    </p>
                                </div>
                            </div>
                            {!editMode && (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="p-2 rounded-xl transition-all"
                                    style={{ background: "#EDE7DC", color: "#6B7280" }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "#2D8F7B"; e.currentTarget.style.color = "white"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "#EDE7DC"; e.currentTarget.style.color = "#6B7280"; }}
                                >
                                    <Edit3 size={14} />
                                </button>
                            )}
                        </div>

                        {/* Email row */}
                        <div
                            className="flex items-center gap-3 p-4 rounded-2xl"
                            style={{ background: "#F7F2EB" }}
                        >
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{ background: "#FDEEF1" }}
                            >
                                <Mail size={16} style={{ color: "#F05D73" }} />
                            </div>
                            <div>
                                <p className="text-xs font-bold" style={{ color: "#9CA3AF" }}>Email Address</p>
                                <p className="text-sm font-extrabold" style={{ color: "#1A2332" }}>
                                    {user?.email || "—"}
                                </p>
                            </div>
                        </div>

                        {/* Password row — static hint */}
                        <div
                            className="flex items-center justify-between p-4 rounded-2xl"
                            style={{ background: "#F7F2EB" }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                                    style={{ background: "#FEF6E0" }}
                                >
                                    <Lock size={16} style={{ color: "#F5B731" }} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold" style={{ color: "#9CA3AF" }}>Password</p>
                                    <p className="text-sm font-extrabold" style={{ color: "#1A2332" }}>
                                        ••••••••••
                                    </p>
                                </div>
                            </div>
                            <span
                                className="text-xs font-bold px-3 py-1.5 rounded-xl"
                                style={{ background: "#FEF6E0", color: "#D99B1A" }}
                            >
                                Protected
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Card 4: Quick links ── */}
                <div className="card animate-fade-in-up">
                    <h4 className="font-extrabold text-base mb-4" style={{ color: "#1A2332" }}>
                        ⚡ Quick Actions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { label: "View Dashboard", emoji: "📊", path: "/dashboard", color: "#7C3AED", lightColor: "#F5F3FF" },
                            { label: "Add Income", emoji: "💰", path: "/income", color: "#2D8F7B", lightColor: "#E4F5F2" },
                            { label: "Add Expense", emoji: "💸", path: "/expense", color: "#F05D73", lightColor: "#FDEEF1" },
                        ].map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className="flex items-center gap-3 p-4 rounded-2xl transition-all text-left"
                                style={{ background: item.lightColor, border: `1.5px solid ${item.color}22` }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 16px ${item.color}25`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                <span style={{ fontSize: 22 }}>{item.emoji}</span>
                                <span className="text-sm font-extrabold" style={{ color: item.color }}>
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </Dashboard>
    );
};

export default Profile;