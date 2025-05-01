import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import "./News.css";
import { db } from "../firebase";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function NewsDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentNews, setCurrentNews] = useState([]);

    useEffect(() => {
        const newsRef = ref(db, "news");

        const unsubscribe = onValue(newsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const newsArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));

                setCurrentNews(newsArray.find((news) => news.id === id));
            } else {
                setCurrentNews([]);
            }
        });

        return () => unsubscribe();
    }, []);

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
