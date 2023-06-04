import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import "./carosuel.scss";
import Genres from "../genres/Genres";
import {genreRandom} from "../../core/GenreRandom";
import {history} from "../../App";

const Carousel = ({ data, loading, title }) => {
    const carouselContainer = useRef();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.sort(() => 0.5 - Math.random())?.map((item) => {
                            const posterUrl = item.hinhAnh
                                ? item.hinhAnh
                                : PosterFallback;
                            return (
                                <div
                                    key={item.maPhim}
                                    className="carouselItem"
                                    onClick={() =>
                                        history.push(`/chi-tiet-phim/${item.maPhim}`)
                                    }
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating
                                            rating={item.danhGia? parseInt(item.danhGia) * 10 : 60 }
                                        />
                                        <Genres
                                            data={genreRandom}
                                        />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.tenPhim}
                                        </span>
                                        <span className="date">
                                            <span>Ngày khởi chiếu:</span>
                                            { dayjs(item.ngayKhoiChieu).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;
