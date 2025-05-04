import { Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import "./HomePage.css";

const activities = [
    {
        title: "兒童主日學",
        description: "教導孩童英文，分享聖經故事，一同參與遊戲",
        image: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282578/kids_qhohro.jpg",
        icon: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282555/kids_muzero.png",
        link: "kids",
    },
    {
        title: "學生課輔",
        description: "老師輔導國高中生，解決課業問題",
        image: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282579/students_opqmfj.jpg",
        icon: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282556/students_nm56vt.png",
        link: "students",
    },
    {
        title: "長者關懷",
        description: "前往日照中心舉辦活動，帶下愛和祝福給長者",
        image: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282578/elders_lu6stx.jpg",
        icon: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282556/elders_lrwjac.png",
        link: "elders",
    },
    {
        title: "聖誕節活動",
        description: "年末舉辦聖誕節活動，歡慶聖誕節",
        image: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282578/christmas_gwr7cj.jpg",
        icon: "https://res.cloudinary.com/dtecs6q1u/image/upload/v1746282555/christmas_o5pefs.png",
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
