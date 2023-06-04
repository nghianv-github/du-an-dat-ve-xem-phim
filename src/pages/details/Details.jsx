import React, {Fragment} from "react";
import "./detail.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import {useParams} from "react-router-dom";
import useFetch from "../../hook/useFetch";
import {API_LINK_DETAIL_MOVIE} from "../../utils/settings/config";
import DetailMovieTheaterComponent from "./DetailMovieTheaterComponent/DetailMovieTheaterComponent";

const Details = () => {
    const { movieId } = useParams();
    const { data, loading } = useFetch(API_LINK_DETAIL_MOVIE + movieId);
    const movieItem = data?.content;
    const movieTheaters = movieItem?.heThongRapChieu;

    return (
        <Fragment>
            <DetailsBanner movieItem={movieItem} loading={loading} />
            <DetailMovieTheaterComponent movieTheaters={movieTheaters} />
        </Fragment>
    );
};

export default Details;
