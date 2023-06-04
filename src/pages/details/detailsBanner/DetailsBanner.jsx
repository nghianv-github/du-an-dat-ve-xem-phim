import React, {Fragment, useState} from "react";
import PosterFallback from "../../../assets/no-poster.png";
import dayjs from "dayjs";
import "./detailBanner.scss";
import ContentWrapper from "../../../conponents/contentWrapper/ContentWrapper";
import Img from "../../../conponents/lazyLoadImage/Img";
import Genres from "../../../conponents/genres/Genres";
import CircleRating from "../../../conponents/circleRating/CircleRating";
import {PlayIcon} from "../Playbtn";
import {genreRandom} from "../../../core/GenreRandom";
import VideoPopup from "../../../conponents/videoPopup/VideoPopup";

const DetailsBanner = ({movieItem, loading}) => {
    const [show, setShow] = useState(false);
    const [link, setLink] = useState(null);

    return (
        <div className="detailsBanner">
            {!loading && movieItem ? (
                <Fragment>
                    <div className="backdrop-img">
                        {movieItem.hinhAnh ? <Img src={movieItem.hinhAnh} /> : ''}
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {movieItem.hinhAnh ? (
                                    <Img className="posterImg"
                                         src={movieItem.hinhAnh}
                                    />
                                ) : (
                                    <Img
                                        className="posterImg"
                                        src={PosterFallback}
                                    />
                                )}
                            </div>
                            <div className="right">
                                <div className="title">
                                    {`${movieItem.tenPhim }
                                             (${dayjs(movieItem.ngayKhoiChieu).format("YYYY")})`}
                                </div>
                                <div className="subtitle">
                                    Lorem Ipsum
                                </div>

                                <Genres data={genreRandom} />

                                <div className="d-flex wr">
                                    <CircleRating
                                        rating={movieItem.danhGia? parseInt(movieItem.danhGia) * 10 : 60 }
                                    />
                                    <div
                                        className="playbtn ml-2"
                                        onClick={() => {
                                            setShow(true);
                                            setLink(movieItem.trailer);
                                        }}
                                    >
                                        <PlayIcon />
                                        <span className="text">
                                                    Xem Trailer
                                                </span>
                                    </div>
                                </div>

                                <div className="overview">
                                    <div className="heading">
                                        Thông tin mô tả
                                    </div>
                                    <div className="description">
                                        {movieItem.moTa}
                                    </div>
                                </div>

                                <div className="info">
                                    <div className="infoItem">
                                                    <span className="text bold">
                                                        Trạng thái:
                                                    </span>
                                        <span className="text">
                                                        {movieItem.dangChieu ? 'Đang chiếu': 'Sắp chiếu' }
                                                    </span>
                                    </div>
                                    {movieItem.ngayKhoiChieu && (
                                        <div className="infoItem">
                                                    <span className="text bold">
                                                        Ngày khởi chiếu:{" "}
                                                    </span>
                                            <span className="text">
                                                        {dayjs(
                                                            movieItem.ngayKhoiChieu
                                                        ).format("DD/MM/YYYY")}
                                                    </span>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                        <VideoPopup
                            show={show}
                            setShow={setShow}
                            link={link}
                            setLink={setLink}
                        />
                    </ContentWrapper>
                </Fragment>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;