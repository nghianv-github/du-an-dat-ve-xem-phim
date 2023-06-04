import React, {Fragment} from 'react';
import {Tabs} from "antd";
import {NavLink} from "react-router-dom";
import dayjs from "dayjs";
import ContentWrapper from "../../../conponents/contentWrapper/ContentWrapper";
import './detailMovieTheaterComponent.scss';

function DetailMovieTheaterComponent({movieTheaters}) {
    const handleChildren = (movieTheater) => {
        return <Fragment>
            {
                movieTheater?.cumRapChieu?.map((item, index) => {
                    return (
                        <div className="movieItemDetail" key={index}>
                            <img className="movieItem__img" src={item.hinhAnh} alt={item.tenCumRap}/>
                            <div className="movieItem__info">
                                <span className="movieItem__info--name">{item.tenCumRap}</span>
                                <span className="movieItem__info--address">{item.diaChi}</span>

                                <div className="movieItem__info--times">
                                    {item?.lichChieuPhim?.slice(0, 12).map((time, index) => {
                                        return <NavLink className="time__item" to={`/dat-ve/${time.maLichChieu}`} key={index}>
                                            {dayjs(time.ngayChieuGioChieu).format('hh:mm:A')}
                                        </NavLink>
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    }

    return (
        <Fragment>
            { Array.isArray(movieTheaters) && movieTheaters.length &&
                <ContentWrapper>
                    <div id="cinemaTitle" className="text-center">
                        <span>Lịch chiếu tại rạp</span>
                    </div>
                    <div className="cinemaWrapperDetail">
                        <Tabs id="cinemaTab" tabPosition="left" items={movieTheaters?.map((movieTheater) => {
                            return {
                                label: <img src={movieTheater.logo} alt={movieTheater.logo} width="50" height="50"
                                            style={{borderRadius: '50%'}}/>,
                                key: movieTheater.maHeThongRap,
                                children: handleChildren(movieTheater),
                            };
                        })}/>
                    </div>
                </ContentWrapper>
            }
        </Fragment>
    );
}

export default React.memo(DetailMovieTheaterComponent);