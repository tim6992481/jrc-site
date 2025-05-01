import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const activities = [
    { id: "reunion", title: "小組聚會", image: "/jrc-site/icons/reunion.png" },
    { id: "worship", title: "主日崇拜", image: "/jrc-site/icons/worship.png" },
    { id: "kids", title: "兒童主日學", image: "/jrc-site/icons/kids.png" },
    { id: "students", title: "學生課輔", image: "/jrc-site/icons/students.png" },
    { id: "elders", title: "長者關懷", image: "/jrc-site/icons/elders.png" },
    { id: "camp", title: "暑期營隊", image: "/jrc-site/icons/camp.png" },
    { id: "easter", title: "復活節活動", image: "/jrc-site/icons/easter.png" },
    { id: "christmas", title: "聖誕慶典", image: "/jrc-site/icons/christmas.png" },
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
