import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
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
        content: "<p></p>",
        createTime: "",
    });
    const [isNewNews, setIsNewNews] = useState(false);

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
                        title: currentNews.title,
                        content: currentNews.content,
                        createTime: currentNews.createTime,
                    });
                    setIsNewNews(false);
                } else {
                    setFormData({
                        title: "",
                        content: "<p></p>",
                        createTime: "",
                    });
                    setIsNewNews(true);
                }
            }
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

        if (!formData.title.trim()) {
            alert("標題不可為空白");
            return;
        }

        const confirmSave = window.confirm("您確定要儲存這些修改嗎？");
        if (!confirmSave) return;

        const now = new Date().toISOString();

        const dataToUpdate = {
            id: id,
            title: formData.title,
            content: formData.content,
            isUsed: true,
            createTime: isNewNews ? now : formData.createTime,
            lastEditTime: now,
        };

        if (confirmSave) {
            const newsRef = ref(db, "news");

            try {
                await update(newsRef, {
                    [id]: dataToUpdate,
                });
                alert("成功提交修改！");
                navigate(`/news`);
            } catch (error) {
                alert("儲存失敗：" + error.message);
            }
        }
    };

    function getToolbar() {
        if (window.innerWidth < 768) {
            return ["undo redo alignleft aligncenter alignright alignjustify removeformat bullist numlist", "fontsize bold italic underline strikethrough forecolor backcolor", "link image media"];
        } else {
            return ["undo redo fontsize bold italic underline strikethrough forecolor backcolor removeformat alignleft aligncenter alignright alignjustify link image media bullist numlist"];
        }
    }

    if (!formData) return <div>資料載入中...</div>;

    return (
        <div className="news-edit">
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "red", marginBottom: "10px" }}>建議使用電腦操作編輯</div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "red", marginBottom: "20px" }}>圖片和影片寬度建議不超過350px</div>

            <div className="form-group">
                <label>標題</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="title-input" />
            </div>

            <div className="form-group">
                <label>內容</label>
                <div className="editor-container">
                    <Editor
                        apiKey="qmhxp7p9xdb80g9ujl2hp8cifitmh76ze32x72ahjnxruxfe"
                        value={formData.content}
                        onEditorChange={(content, editor) => {
                            setFormData((prev) => ({ ...prev, content: content }));
                        }}
                        init={{
                            height: 600,
                            menubar: false,
                            branding: false,
                            statusbar: false,
                            plugins: "lists link image media preview",
                            toolbar: toolbarConfig,
                            automatic_uploads: true,
                            file_picker_types: "image",
                            image_uploadtab: false,
                            media_live_embeds: false,
                            media_filter_html: false,
                            media_poster: false,
                            media_alt_source: false,
                            media_dimensions: true,
                            images_upload_handler: async (blobInfo, success, failure) => {
                                try {
                                    const formData = new FormData();
                                    formData.append("file", blobInfo.blob());
                                    formData.append("upload_preset", "jrc-unsigned");

                                    const response = await axios.post("https://api.cloudinary.com/v1_1/dtecs6q1u/image/upload", formData);
                                    const imageUrl = response.data.secure_url;
                                    console.log(imageUrl);

                                    if (imageUrl) {
                                        success(imageUrl);
                                    } else {
                                        failure("圖片上傳失敗：找不到圖片網址");
                                    }
                                } catch (error) {
                                    console.error("圖片上傳失敗:", error);
                                    failure("圖片上傳失敗，請稍後再試");
                                }
                            },
                            file_picker_callback: function (callback, value, meta) {
                                if (meta.filetype === "image") {
                                    const input = document.createElement("input");
                                    input.setAttribute("type", "file");
                                    input.setAttribute("accept", "image/*");

                                    input.onchange = async function () {
                                        const file = input.files[0];
                                        const formData = new FormData();
                                        formData.append("file", file);
                                        formData.append("upload_preset", "jrc-unsigned");

                                        try {
                                            const response = await axios.post("https://api.cloudinary.com/v1_1/dtecs6q1u/image/upload", formData);
                                            const imageUrl = response.data.secure_url;
                                            callback(imageUrl, { title: file.name });
                                        } catch (err) {
                                            console.error("file_picker_callback 上傳失敗", err);
                                        }
                                    };

                                    input.click();
                                }
                            },
                            images_reuse_filename: true,
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
