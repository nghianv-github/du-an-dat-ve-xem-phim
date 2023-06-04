import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./homeBanner.scss";

import Img from "../../../conponents/lazyLoadImage/Img";
import ContentWrapper from "../../../conponents/contentWrapper/ContentWrapper";

const HomeBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    // const navigate = useNavigate();
    const {url} = useSelector((state) => state.home);

    useEffect(() => {
        const index = Math.floor(Math.random() * 3);
        setBackground(url[index]?.hinhAnh);
    }, [url]);


    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            // navigate(`/search/${query}`);
            console.log(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {background && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">CGV</span>
                    <span className="subTitle">
                        Đặt vé xem phim ngay thôi nào!
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HomeBanner;
