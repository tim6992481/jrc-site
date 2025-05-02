import { Editor } from "@tinymce/tinymce-react";
import { onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import "./News.css";

function NewsEdit(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [toolbarConfig, setToolbarConfig] = useState(getToolbar());
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        content: "<p></p>",
    });

    useEffect(() => {
        const newsRef = ref(db, "news");

        const unsubscribe = onValue(newsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const newsArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));

                const currentNews = newsArray.find((news) => news.id === id);

                if (currentNews) {
                    setFormData({
                        title: currentNews.title || "",
                        date: currentNews.date || "",
                        content: currentNews.content || "<p></p>",
                    });
                }
            } else {
                setFormData({
                    title: "",
                    date: "",
                    content: "<p></p>",
                });
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleResize = () => setToolbarConfig(getToolbar());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!props.isLogin) {
            alert("請先登入才能儲存修改。");
            return;
        }

        const confirmSave = window.confirm("您確定要儲存這些修改嗎？");

        if (confirmSave) {
            const newsRef = ref(db, "news");

            await update(newsRef, {
                [id]: {
                    id: id,
                    title: formData.title,
                    date: formData.date,
                    content: formData.content,
                    isUsed: true,
                },
            })
                .then(() => {
                    alert("成功提交修改！");
                    navigate(`/news`);
                })
                .catch((error) => {
                    alert("儲存失敗：" + error.message);
                });
        }
    };

    function getToolbar() {
        if (window.innerWidth < 768) {
            return ["undo redo | alignleft aligncenter alignright alignjustify removeformat", "fontsize | bold italic underline strikethrough forecolor backcolor"];
        } else {
            return ["undo redo | fontsize | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify removeformat"];
        }
    }

    if (!formData) return <div>資料載入中...</div>;

    return (
        <div className="news-edit">
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "red", marginBottom: "20px" }}>*建議使用電腦操作編輯</div>

            <div className="form-group">
                <label>標題</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="title-input" />
            </div>

            <div className="form-group">
                <label>日期</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="date-input" />
            </div>

            <div className="form-group">
                <label>內容</label>
                <div className="editor-container">
                    <Editor
                        apiKey="qmhxp7p9xdb80g9ujl2hp8cifitmh76ze32x72ahjnxruxfe"
                        value={formData.content}
                        onEditorChange={(content, editor) => {
                            setFormData((prev) => ({ ...prev, content })); // 正確更新內容
                        }}
                        init={{
                            height: 600,
                            menubar: false,
                            branding: false,
                            statusbar: false,
                            plugins: ["advlist autolink lists link image charmap print preview anchor"],
                            toolbar: toolbarConfig,
                        }}
                    />
                </div>
            </div>

            <div className="edit-actions">
                <button className="save-button" onClick={handleSave}>
                    保存
                </button>
                <button className="cancel-button" onClick={() => navigate(`/news`)}>
                    取消
                </button>
            </div>
        </div>
    );
}

export default NewsEdit;
