import React from "react";

import "./contentWrapper.scss";

const ContentWrapper = ({ children, className }) => {
    return <div className={`contentWrapper ${className ?? ''}`}>{children}</div>;
};

export default ContentWrapper;
