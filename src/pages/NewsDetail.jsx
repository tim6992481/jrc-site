import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import "./News.css";

function NewsDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentNews, setCurrentNews] = useState(undefined); // ✅ 初始為 undefined

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
            {currentNews === undefined ? (
                <div className="loading">載入中...</div>
            ) : currentNews === null ? (
                <div className="news-title">內容不存在</div>
            ) : currentNews.isUsed ? (
                <>
                    <div className="news-title">{currentNews.title}</div>
                    <div className="news-date">{currentNews.date}</div>
                    <div className="news-content" dangerouslySetInnerHTML={{ __html: currentNews.content }} />
                    <div className="news-actions">
                        <button className="back-button" onClick={() => navigate(`/news`)}>
                            <ArrowBackIosIcon /> 返回
                        </button>
                    </div>
                </>
            ) : (
                <div className="news-title">內容不存在</div>
            )}
        </div>
    );
}

export default NewsDetail;
