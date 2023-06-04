import React from "react";
import ReactPlayer from "react-player/youtube";

import "./videoPopup.scss";

const VideoPopup = ({ show, setShow, link, setLink }) => {
    const hidePopup = () => {
        setShow(false);
        setLink(null);
    };
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Đóng
                </span>
                <ReactPlayer
                    url={link}
                    controls
                    width="100%"
                    height="100%"
                    playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;