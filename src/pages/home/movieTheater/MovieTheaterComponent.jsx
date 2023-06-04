import { Tabs } from 'antd';
import React, {Fragment} from 'react';
import {NavLink} from "react-router-dom";
import dayjs from "dayjs";
import ContentWrapper from "../../../conponents/contentWrapper/ContentWrapper";
import './movieTheaterComponent.scss';

//class PercentageStat extends React.PureComponent
//ko gọi tới sẽ k render lại giao diện

// function
//https://reactjs.org/docs/react-api.html#reactmemo
//https://stackoverflow.com/questions/43470659/declare-a-functional-component-as-pure

function MovieTheaterComponent({movieTheaters}) {
    const handleChildren = (movieTheater) => {
        return <Tabs tabPosition="left" items={movieTheater.lstCumRap?.map((cumRap, index) => {
            return {
                key: index,
                label: (<div className="branchWrapper">
                    <img style={{objectFit: "scale-down"}} className="mr-2"
                         src={cumRap.hinhAnh}
                         alt={cumRap.hinhAnh}
                         width="50" height="50" />
                    <div className="branchInfo">
                        <span>{cumRap.tenCumRap}</span>
                        <span>[Chi tiết]</span>
                    </div>
                </div>),
                children: (<Fragment>
                    {
                        // load lịch chiếu phim
                        cumRap.danhSachPhim.map((phim, index) => {
                            return (
                                <div className="movieItem" key={index}>
                                    <img className="movieItem__img" src={phim.hinhAnh} alt={phim.tenPhim}/>
                                    <div className="movieItem__info">
                                        <span className="movieItem__info--name">{phim.tenPhim}</span>
                                        <span className="movieItem__info--address">{cumRap.diaChi}</span>

                                        <div className="movieItem__info--times">
                                            {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                return <NavLink className="time__item" to={`/dat-ve/${lichChieu.maLichChieu}`} key={index}>
                                                    {dayjs(lichChieu.ngayChieuGioChieu).format('hh:mm:A')}
                                                </NavLink>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Fragment>)
            };
        })}
        />
    }

    return (
        <Fragment>
            { movieTheaters &&
                <ContentWrapper>
                    <div id="cinemaTitle" className="text-center">
                        <span>Danh sách cụm rạp</span>
                    </div>
                    <div className="cinemaWrapper">
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

export default React.memo(MovieTheaterComponent);