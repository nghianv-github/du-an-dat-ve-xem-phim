import React, {useEffect} from 'react';
import HomeBanner from "./banner/HomeBanner";
import Trending from "./trending/Trending";
import "./home.scss";
import {useDispatch, useSelector} from "react-redux";
import {getMovieTheaterAction} from "../../redux/actions/TheaterManagerAction";
import MovieTheaterComponent from "./movieTheater/MovieTheaterComponent";

function Home(props) {
    const dispatch = useDispatch();
    const {movieTheaters} = useSelector(state => state.movieTheater);

    useEffect(() => {
        dispatch(getMovieTheaterAction());
    }, []);

    return (
        <div className="homePage">
            <HomeBanner />
            <Trending />
            <Trending />
            <Trending />
            <MovieTheaterComponent movieTheaters={movieTheaters}/>
        </div>
    );
}

export default Home;