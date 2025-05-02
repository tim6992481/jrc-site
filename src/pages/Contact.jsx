import EmailIcon from "@mui/icons-material/Email";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import PhoneIcon from "@mui/icons-material/Phone";
import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";
import React from "react";
import "./Contact.css";

const Contact = () => {
    const position = { lat: 22.626234814717982, lng: 120.3015914872703 };

    return (
        <div className="contact-page">
            <div className="map-container">
                <APIProvider apiKey={"AIzaSyBiCYXmr1_pX2rY9qGV2OHoXKjv0xZ7pCo"}>
                    <Map style={{ width: "100%", height: "400px", marginBottom: "20px" }} defaultCenter={position} defaultZoom={16} mapId="DEMO_MAP_ID" zoomControl={true}>
                        <AdvancedMarker position={position}>
                            <Pin />
                        </AdvancedMarker>
                    </Map>
                </APIProvider>
            </div>

            <div className="contact-info">
                <div className="contact-item">
                    <LocationPinIcon />{" "}
                    <span>
                        高雄市新興區中山一路 xx 號
                        <br />( 於高雄捷運中央公園站 3 號出口前 )
                    </span>
                </div>
                <div className="contact-item">
                    <PhoneIcon />
                    <span>莫老師 0939-565-892</span>
                </div>
                <div className="contact-item">
                    <EmailIcon />
                    <span>example@gmail.com</span>
                </div>
            </div>
        </div>
    );
};

export default Contact;
