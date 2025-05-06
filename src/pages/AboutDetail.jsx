import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import "./About.css";

const AboutDetail = (props) => {
    const { activityId } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState({});

    useEffect(() => {
        const activityRef = ref(db, `activities/${activityId}`);

        const unsubscribe = onValue(activityRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setActivity(data);
            } else {
                setActivity({});
            }
        });

        return () => unsubscribe();
    }, []);

    const handleEdit = () => {
        navigate(`/about/edit/${activityId}`);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", textAlign: "left" }}>
            {activity ? (
                <>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                            gap: "10px",
                        }}
                    >
                        <img src={activity.icon} alt={activity.title} style={{ height: "50px", width: "50px" }} />
                        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#2c3e50" }}>{activity.title}</div>
                    </div>

                    <div className="about-content" style={{ fontSize: "18px", lineHeight: "1.6" }} dangerouslySetInnerHTML={{ __html: activity.description }} />
                </>
            ) : (
                <div>活動未找到</div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
                <button className="back-button" onClick={() => navigate("/about")}>
                    <ArrowBackIosIcon /> 返回
                </button>
                {props.isLogin && (
                    <button className="aboutedit-button" onClick={handleEdit}>
                        編輯內容
                    </button>
                )}
            </div>
        </div>
    );
};

export default AboutDetail;
