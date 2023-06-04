import React, { useState } from "react";
import useFetch from "../../../hook/useFetch";
import ContentWrapper from "../../../conponents/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../conponents/switchTabs/SwitchTabs";
import Carousel from "../../../conponents/carousel/Carousel";
import {API_LINK_LIST_MOVIE} from "../../../utils/settings/config";

const Trending = () => {
    const [endpoint, setEndpoint] = useState("live");

    const { data, loading } = useFetch(API_LINK_LIST_MOVIE);

    let movies = []

    data?.content?.map((item, index) => {
        switch (endpoint){
            case 'coming':
                if(item.sapChieu)
                    movies.push(item);
                break;
            default:
                if(item.dangChieu)
                    movies.push(item);
                break
        }
    });

    const onTabChange = (tab) => {
        setEndpoint(tab === "live" ? "live" : "coming");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Danh sách phim</span>
                <SwitchTabs data={["live", "coming"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={movies} loading={loading} />
        </div>
    );
};

export default Trending;
