import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Income from "./pages/Income.jsx";
import Expense from "./pages/Expense.jsx";
import Category from "./pages/Category.jsx";
import Filter from "./pages/Filter.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage.jsx";

const App = () => {
    return (
        <>
            <Toaster
                toastOptions={{
                    style: {
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: "700",
                        borderRadius: "16px",
                        border: "1.5px solid #F7F2EB",
                    },
                }}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/expense" element={<Expense />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/filter" element={<Filter />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

const Root = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/home" />;
};

export default App;