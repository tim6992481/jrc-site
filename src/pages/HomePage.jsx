import { Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import "./HomePage.css";

const activities = [
    {
        title: "兒童主日學",
        description: "教導孩童英文，分享聖經故事，一同參與遊戲",
        image: "/jrc-site/images/kids.jpg",
        icon: "/jrc-site/icons/kids.png",
        link: "kids",
    },
    {
        title: "學生課輔",
        description: "老師輔導國高中生，解決課業問題",
        image: "/jrc-site/images/students.jpg",
        icon: "/jrc-site/icons/students.png",
        link: "students",
    },
    {
        title: "長者關懷",
        description: "前往日照中心舉辦活動，帶下愛和祝福給長者",
        image: "/jrc-site/images/elders.jpg",
        icon: "/jrc-site/icons/elders.png",
        link: "elders",
    },
    {
        title: "聖誕節活動",
        description: "年末舉辦聖誕節活動，歡慶聖誕節",
        image: "/jrc-site/images/christmas.jpg",
        icon: "/jrc-site/icons/christmas.png",
        link: "christmas",
    },
];

const HomePage = () => {
    return (
        <div className="home-page">
            <ImageCarousel />

            <div className="about-wrapper">
                <div className="about-section">
                    <h2>關於我們</h2>
                    <p>
                        我們致力於一同學習並實踐聖經的內容於生活當中。我們前往偏鄉國小舉辦營隊，也有復活節與聖誕節的活動，與社區孩子們同樂，分享上帝的愛和祝福。我們彼此關懷、讓每個生命都能成長茁壯。
                    </p>
                </div>

                {activities.map((activity, index) => (
                    <Link to={`/about/${activity.link}`} key={index} className={`activity-block ${index % 2 === 1 ? "reverse" : ""}`}>
                        <div className="activity-image" style={{ backgroundImage: `url(${activity.image})` }}>
                            <div className="gradient-overlay" />
                        </div>
                        <div className="activity-text">
                            <h2>{activity.title}</h2>
                            <p>{activity.description}</p>
                            <img src={activity.icon} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
