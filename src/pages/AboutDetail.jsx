import { useParams, useNavigate } from "react-router-dom";
import "./About.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const activityDetails = {
    reunion: { title: "小組聚會", description: "這是小組聚會的詳細介紹" },
    worship: { title: "主日崇拜", description: "這是主日崇拜的詳細介紹" },
    kids: { title: "兒童主日學", description: "這是兒童主日學的詳細介紹" },
    students: { title: "學生課輔", description: "這是學生課輔的詳細介紹" },
    elders: { title: "長者關懷", description: "這是長者關懷的詳細介紹" },
    camp: { title: "暑期營隊", description: "這是暑期營隊的詳細介紹" },
    easter: { title: "復活節活動", description: "這是復活節活動的詳細介紹" },
    christmas: { title: "聖誕慶典", description: "這是聖誕慶典的詳細介紹" },
};

const AboutDetail = () => {
    const { activityId } = useParams();
    const navigate = useNavigate();
    const activity = activityDetails[activityId];

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", textAlign: "left" }}>
            {activity ? (
                <>
                    <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px", color: "#2c3e50" }}>{activity.title}</div>
                    <p style={{ fontSize: "18px", lineHeight: "1.6" }}>{activity.description}</p>
                </>
            ) : (
                <div>活動未找到</div>
            )}

            <button className="back-button" onClick={() => navigate(-1)}>
                <ArrowBackIosIcon /> 返回
            </button>
        </div>
    );
};

export default AboutDetail;
