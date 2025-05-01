import { Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import "./HomePage.css";

const activities = [
    {
        title: "兒童主日學",
        description: "陪同孩童學習英文，分享聖經故事，一同參與遊戲。",
        image: "/jrc-site/images/kids.jpg",
        link: "kids",
    },
    {
        title: "學生課輔",
        description: "老師輔導國高中生課業，解決課業問題。",
        image: "/jrc-site/images/students.jpg",
        link: "students",
    },
    {
        title: "長者關懷",
        description: "前往日照中心，關心長者需要，帶下愛和祝福。",
        image: "/jrc-site/images/elders.jpg",
        link: "elders",
    },
    {
        title: "聖誕慶典",
        description: "年末於教會舉辦聖誕節活動，歡慶聖誕節。",
        image: "/jrc-site/images/christmas.jpg",
        link: "christmas",
    },
];

const HomePage = () => {
    return (
        <div>
            <ImageCarousel />
            <div className="about-wrapper">
                {activities.map((activity, index) => (
                    <Link to={`/about/${activity.link}`} key={index} className={`activity-block ${index % 2 === 1 ? "reverse" : ""}`}>
                        <div className="activity-image" style={{ backgroundImage: `url(${activity.image})` }}>
                            <div className="gradient-overlay" />
                        </div>
                        <div className={`activity-text ${index % 2 === 1 ? "reverse" : ""}`}>
                            <h2>{activity.title}</h2>
                            <p>{activity.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
