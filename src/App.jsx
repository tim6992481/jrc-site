import EmailIcon from "@mui/icons-material/Email";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import { get, ref } from "firebase/database";
import md5 from "js-md5";
import React, { useState } from "react";
import { Link, Route, HashRouter as Router, Routes, useLocation } from "react-router-dom";
import { db } from "../src/firebase.js";
import "./App.css";
import About from "./pages/About";
import AboutDetail from "./pages/AboutDetail.jsx";
import AboutEdit from "./pages/AboutEdit.jsx";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import NewsEdit from "./pages/NewsEdit";

const pageTitles = {
    "/": "",
    "/news": "最新消息",
    "/about": "活動介紹",
    "/contact": "聯絡我們",
};

function PageHeader() {
    const location = useLocation();
    const title = getPageTitle(location.pathname);
    return title && <div className="page-header">{title}</div>;
}

function getPageTitle(pathname) {
    if (pathname.startsWith("/news/edit")) return "編輯頁面";
    if (pathname.startsWith("/news")) return "最新消息";
    if (pathname.startsWith("/about/edit")) return "編輯頁面";
    if (pathname.startsWith("/about")) return "活動介紹";

    return pageTitles[pathname] || "";
}

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        const adminName = await get(ref(db, "adminName"));
        const adminKey = await get(ref(db, "adminKey"));
        const adminNameVal = adminName.val();
        const adminKeyVal = adminKey.val();

        if (username === adminNameVal && md5(password) == adminKeyVal) {
            alert("登入成功！");
            setShowLogin(false);
            setIsLogin(true);
            setUsername("");
            setPassword("");
            setError("");
        } else {
            setError("帳號或密碼錯誤");
        }
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("您確定要登出嗎？");

        if (confirmLogout) {
            setIsLogin(!isLogin);
        }
    };

    return (
        <Router>
            <div className="container">
                <div className="content-wrapper">
                    <header className="header">
                        <Link to="/">
                            喜樂復興教會<div style={{ fontSize: "16px" }}>Joyful Revival Church</div>
                        </Link>

                        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                            <MenuIcon sx={{ fontSize: 32 }} />
                        </button>

                        {!isLogin && (
                            <button className="login-button" onClick={() => setShowLogin(true)}>
                                登入
                            </button>
                        )}

                        {isLogin && (
                            <button className="logout-button" onClick={() => handleLogout()}>
                                登出
                            </button>
                        )}
                    </header>

                    {menuOpen && <div className="navbar-overlay open" onClick={() => setMenuOpen(false)}></div>}

                    <nav className={`navbar ${menuOpen ? "open" : ""}`}>
                        <Link to="/" onClick={() => setMenuOpen(false)}>
                            首頁
                        </Link>
                        <Link to="/news" onClick={() => setMenuOpen(false)}>
                            最新消息
                        </Link>
                        <Link to="/about" onClick={() => setMenuOpen(false)}>
                            活動介紹
                        </Link>
                        <Link to="/contact" onClick={() => setMenuOpen(false)}>
                            聯絡我們
                        </Link>
                    </nav>

                    <main>
                        <PageHeader />

                        <div className="main-content">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/news" element={<News isLogin={isLogin} />} />
                                <Route path="/news/:id" element={<NewsDetail />} />
                                <Route path="/news/edit/:id" element={<NewsEdit isLogin={isLogin} />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/about/:activityId" element={<AboutDetail isLogin={isLogin} />} />
                                <Route path="/about/edit/:activityId" element={<AboutEdit isLogin={isLogin} />} />
                                <Route path="/contact" element={<Contact />} />
                            </Routes>
                        </div>
                    </main>

                    {showLogin && (
                        <div
                            className="login-overlay"
                            onClick={() => {
                                setShowLogin(false);
                                setUsername("");
                                setPassword("");
                                setError("");
                            }}
                        >
                            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                                <h2>登入</h2>
                                <input type="text" placeholder="帳號" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <input type="password" placeholder="密碼" value={password} onChange={(e) => setPassword(e.target.value)} />
                                {error && <div className="error">{error}</div>}
                                <div style={{ display: "flex", gap: "15px", justifyContent: "center", margin: "10px" }}>
                                    <button className="ok-button" onClick={handleLogin}>
                                        登入
                                    </button>
                                    <button
                                        className="cancel-button"
                                        onClick={() => {
                                            setShowLogin(false);
                                            setUsername("");
                                            setPassword("");
                                            setError("");
                                        }}
                                    >
                                        取消
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <footer className="footer">
                        <div className="footer-left">
                            <div>喜樂復興教會</div>
                            <div>
                                <LocationPinIcon />
                                <span>高雄市新興區中山一路 14 號</span>
                            </div>
                            <div>
                                <PhoneIcon />
                                <span>莫老師 0939-565-892</span>
                            </div>
                            <div>
                                <EmailIcon />
                                <span>example@gmail.com</span>
                            </div>
                        </div>
                        <div className="footer-right">
                            <a href="https://www.facebook.com/groups/1404569666890900">
                                <img src="https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282556/facebook_sitfoq.png" alt="Facebook" />
                            </a>
                            <a href="https://www.instagram.com/joyrevivalchurh77">
                                <img src="https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282555/instagram_vzig1y.png" alt="Instagram" />
                            </a>
                            <a href="https://www.youtube.com/@jrc7627">
                                <img src="https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282557/youtube_f0rnqf.png" alt="YouTube" />
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </Router>
    );
}

export default App;
