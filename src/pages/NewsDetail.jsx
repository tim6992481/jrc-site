import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import "./News.css";

function NewsDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentNews, setCurrentNews] = useState([]);

    useEffect(() => {
        if (!id) return;

        const newsRef = ref(db, `news/${id}`);

        const unsubscribe = onValue(newsRef, (snapshot) => {
            if (snapshot.exists()) {
                setCurrentNews({ id, ...snapshot.val() });
            } else {
                setCurrentNews(null);
            }
        });

        return () => unsubscribe();
    }, [id]);

    return (
        <div className="news-detail">
            <div className="news-title">{currentNews.title}</div>
            <div className="news-date">{currentNews.date}</div>
            <div className="news-content" dangerouslySetInnerHTML={{ __html: currentNews.content }} />
            <div className="news-actions">
                <button className="back-button" onClick={() => navigate(`/news`)}>
                    <ArrowBackIosIcon /> 返回
                </button>
            </div>
        </div>
    );
}

export default NewsDetail;
