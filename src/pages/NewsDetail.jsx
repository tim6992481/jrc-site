import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import "./News.css";

function formatDate(isoString) {
    if (!isoString) return "無資料";
    const date = new Date(isoString);

    const year = date.getFullYear() - 1911;
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function NewsDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentNews, setCurrentNews] = useState(undefined);

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
                    <div className="news-meta" style={{ display: "flex", gap: "20px" }}>
                        <div className="news-time">發布：{formatDate(currentNews.createTime)}</div>
                        <div className="news-time">編輯：{formatDate(currentNews.lastEditTime)}</div>
                    </div>
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
