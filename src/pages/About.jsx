import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "./About.css";

const activities = ["reunion", "worship", "kids", "students", "elders", "camp", "easter", "christmas"];

const About = () => {
    const navigate = useNavigate();
    const [activitiesData, setActivitiesData] = useState([]);

    useEffect(() => {
        const activitiesRef = ref(db, "activities");

        const unsubscribe = onValue(activitiesRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                const sortedArray = activities
                    .filter((key) => data[key])
                    .map((key) => ({
                        id: key,
                        ...data[key],
                    }));

                setActivitiesData(sortedArray);
            } else {
                setActivitiesData([]);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="about-page">
            <div className="card-grid">
                {activitiesData.map((item) => (
                    <div className="activity-card" onClick={() => navigate(`/about/${item.id}`)}>
                        <div className="image-wrapper">
                            <img src={item.icon} alt={item.title} />
                        </div>
                        <div className="card-text">
                            <h2>{item.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;
