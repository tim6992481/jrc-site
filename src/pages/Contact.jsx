import React from "react";
import { AdvancedMarker, APIProvider, Map, MapControl, Pin } from "@vis.gl/react-google-maps";

const Contact = () => {
    const position = { lat: 22.626122, lng: 120.301558 };

    return (
        <div className="contact-page">
            <div className="map-container">
                <APIProvider apiKey={"AIzaSyBiCYXmr1_pX2rY9qGV2OHoXKjv0xZ7pCo"}>
                    <Map style={{ width: "100%", height: "500px", marginTop: "30px" }} defaultCenter={position} defaultZoom={16} mapId="DEMO_MAP_ID" zoomControl={true}>
                        <AdvancedMarker position={position}>
                            <Pin />
                        </AdvancedMarker>
                    </Map>
                </APIProvider>
            </div>

            <p>
                地址：800高雄市新興區中山一路xx-xx號
                <br />
                (於捷運中央公園站3號出口前)
            </p>
            <p>聯絡電話：0912-345-678</p>
            <p>Email：example@gmail.com</p>
        </div>
    );
};

export default Contact;
