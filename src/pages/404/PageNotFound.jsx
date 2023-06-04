import React from "react";

import "./pageNotFound.scss";
import ContentWrapper from "../../conponents/contentWrapper/ContentWrapper";


const PageNotFound = () => {
    return (
        <div className="pageNotFound">
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Trang không tồn tại!</span>
            </ContentWrapper>
        </div>
    );
};

export default PageNotFound;
