import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const activities = [
    { id: "reunion", title: "小組聚會", image: "/icons/reunion.png" },
    { id: "worship", title: "主日崇拜", image: "/icons/worship.png" },
    { id: "kids", title: "兒童主日學", image: "/icons/kids.png" },
    { id: "students", title: "學生課輔", image: "/icons/students.png" },
    { id: "elders", title: "長者關懷", image: "/icons/elders.png" },
    { id: "camp", title: "暑期營隊", image: "/icons/camp.png" },
    { id: "christmas", title: "聖誕慶典", image: "/icons/christmas.png" },
];

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="about-page">
            <div className="card-grid">
                {activities.map((item) => (
                    <div className="activity-card" onClick={() => navigate(`/about/${item.id}`)}>
                        <div className="image-wrapper">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="card-text">
                            <h2>{item.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;
