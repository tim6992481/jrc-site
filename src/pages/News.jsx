import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "./News.css";

function formatDate(isoString) {
    if (!isoString) return "無資料";
    const date = new Date(isoString);
    return date.toLocaleString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function News(props) {
    const [newsData, setNewsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const newsRef = ref(db, "news");

        const unsubscribe = onValue(newsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const newsArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));

                setNewsData(newsArray);
            } else {
                setNewsData([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleEdit = (index) => {
        navigate(`/news/edit/${index}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("您確定要刪除這條消息嗎？");

        if (confirmDelete) {
            const newsRef = ref(db, "news");

            const index = newsData.findIndex((news) => news.id === id);

            await update(newsRef, {
                [id]: { id: newsData[index].id, title: newsData[index].title, date: newsData[index].date, content: newsData[index].content, isUsed: false },
            })
                .then(() => {
                    alert("成功刪除消息！");
                    navigate(`/news`);
                })
                .catch((error) => {
                    alert("刪除失敗：" + error.message);
                    console.log(error.message);
                });
        }
    };

    const isNew = (isoString) => {
        if (!isoString) return false;

        const newsDate = new Date(isoString);
        if (isNaN(newsDate.getTime())) return false; // 無效日期保護

        const now = new Date();
        const diffTime = now - newsDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24); // 毫秒轉天數

        return diffDays <= 7;
    };

    return (
        <div className="news-container">
            {newsData
                .sort((a, b) => parseInt(b.id) - parseInt(a.id))
                .filter((news) => news.isUsed === true)
                .map((news, index) => (
                    <div key={index} className="news-card">
                        <Link to={`/news/${news.id}`} className="news-link">
                            <div className="news-title">
                                {news.title} {isNew(news.createTime) && <span className="new-tag">New</span>}
                            </div>
                        </Link>
                        <div className="news-time">{formatDate(news.createTime)}</div>
                        {props.isLogin && (
                            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                                <button className="edit-button" onClick={() => handleEdit(news.id)}>
                                    編輯內容
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(news.id)}>
                                    刪除內容
                                </button>
                            </div>
                        )}
                    </div>
                ))}

            {props.isLogin && (
                <button className="edit-button" style={{ marginTop: "10px" }} onClick={() => handleEdit(newsData.length)}>
                    新增內容
                </button>
            )}
        </div>
    );
}
