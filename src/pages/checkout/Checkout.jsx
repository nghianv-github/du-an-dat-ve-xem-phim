import React, {Fragment, useEffect, useState} from "react";
import './checkout.scss';
import style from './checkout-chair.module.css';
import {NavLink, useParams} from "react-router-dom";
import chair1 from '../../assets/checkout/seat-buy-normal.png';
import chair2 from '../../assets/checkout/seat-process-normal.png';
import chair3 from '../../assets/checkout/seat-select-normal.png';
import chair4 from '../../assets/checkout/seat-set-normal.png';
import chair5 from '../../assets/checkout/seat-unselect-vip.png';
import chair6 from '../../assets/checkout/seat-unselect-normal.png';
import ImgScreen from '../../assets/checkout/ic-screen.png';
import {datGheAction, quanLyDatVeAction} from "../../redux/actions/BookingChairAction";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../../App";

function Checkout(props) {
    const dispatch = useDispatch();
    const { movieId } = useParams();
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);
    const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth);

    const {userLogin} = useSelector(state => state.accountSlide);
    const {chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat} = useSelector(state => state.bookChairSlide);
    const {thongTinPhim, danhSachGhe} = chiTietPhongVe;

    // ==== Check count down ====
    const countDown = () => {
        let interval = setTimeout(function(){
            setSeconds(seconds - 1);
            // Nếu số giây = -1 tức là đã chạy ngược hết số giây, lúc này:
            //  - giảm số phút xuống 1 đơn vị
            //  - thiết lập số giây lại 59
            if (seconds === 0){
                setMinutes(minutes - 1);
                setSeconds(59);
            }

            // Nếu số phút = -1 tức là đã chạy ngược hết số phút, lúc này:
            //  - giảm số giờ xuống 1 đơn vị
            //  - thiết lập số phút lại 59
            if (minutes === 0 && seconds === 0){
                clearTimeout(interval);
                history.push('/');
            }
        }, 1000);
    }
    // ==== Check count down ====


    // ==== Render list chair ====
    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'Vip' ? style.gheVip: '',
                classGheDaDat = ghe.daDat === true ? style.gheDaDat: '',
                classGhe = style.ghe,
                classGheDangDat = '', classGheDaDuocDat = '';

            let indexGheDD = danhSachGheDangDat.findIndex(item => item.maGhe === ghe.maGhe);
            if(indexGheDD !== -1){
                classGheDangDat = style.gheDangDat;
            }

            if(userLogin.taiKhoan === ghe.taiKhoanNguoiDat){
                classGheDaDuocDat = style.gheDaDuocDat;
            }

            // Kiem tra tung ghe xem co phai ghe khach dat khong
            let classGheKhachDat = '',
                indexGheKD = danhSachGheKhachDat?.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
            if(indexGheKD !== -1){
                classGheKhachDat = style.gheKhachDat;
            }

            return <Fragment key={index}>
                {<button
                    onClick={() => {
                        dispatch(datGheAction(ghe, movieId));
                    }}
                    disabled={ghe.daDat || classGheKhachDat !== ''}
                    className={`${classGhe} ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`}
                >
                    {
                        ghe.daDat? 'X' :(classGheKhachDat !== '' ? 'O' : ghe.stt)
                    }
                </button>}
                {((index + 1) % 16 === 0) ? <br />: ''}
            </Fragment>
        })
    }
    // ==== Render list chair ====


    // ==== scroll sildebar ====
    const controlNavbar = () => {
        let elmBr = document.getElementById("js-book-right"),
            hm = document.getElementsByClassName('main-content')[0].offsetHeight,
            hb = elmBr.offsetHeight,
            sy = window.scrollY;

        if(screenWidth >= 1024){
            if(sy + hb + 120 < hm){
                elmBr.style.top = sy + "px";
            }else{
                elmBr.style.top = hm - hb - 120 + "px";
            }
        }else{
            elmBr.style.top = "0px";
        }
        setLastScrollY(sy);
    };


    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenWidth(document.documentElement.clientWidth);
        });
    }, [screenWidth]);


    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [screenWidth, lastScrollY]);
    // ==== scroll sildebar ====


    useEffect(() => {
        dispatch(quanLyDatVeAction(movieId));
    }, []);


    useEffect(() => {
        countDown()
    }, [seconds]);

    return (
      <div className="wrapper-book">
          <div className="contentWrapper">
              <div className="row">
                  <div className="col-12 col-lg-9">
                      <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                              <li className="breadcrumb-item"><NavLink to={'/'}>Trang chủ</NavLink></li>
                              <li className="breadcrumb-item"><NavLink to={'#'}>Đặt vé</NavLink></li>
                              <li className="breadcrumb-item active" aria-current="page">{thongTinPhim.tenPhim}</li>
                          </ol>
                      </nav>
                      <div className="box-overflow">
                          <div className="chair-status">
                              <div className="chair-status-item">
                                  <img src={chair6} alt="/" />
                                  <span className="chair-name">Ghế chưa đặt</span>
                              </div>
                              <div className="chair-status-item">
                                  <img src={chair3} alt="/" />
                                  <span className="chair-name">Ghế đang đặt</span>
                              </div>
                              <div className="chair-status-item">
                                  <img src={chair2} alt="/" />
                                  <span className="chair-name">Ghế đã đặt</span>
                              </div>
                              <div className="chair-status-item">
                                  <img src={chair1} alt="/" />
                                  <span className="chair-name">Ghế mình đặt</span>
                              </div>
                              <div className="chair-status-item">
                                  <img src={chair4} alt="/" />
                                  <span className="chair-name">Ghế khách đang đặt</span>
                              </div>
                          </div>
                          <div className="chair-select">
                              <div className="screen-img">
                                  <img src={ImgScreen} alt="/" />
                              </div>
                              <div className="chair-show">
                                  {renderSeats()}
                              </div>
                          </div>
                      </div>
                      <div className="total-money">
                          <div className="row">
                              <div className="col-12 col-lg-3 box-chair d-justify-align">
                                  <img src={chair6} alt="/" />
                                  <span className="chair-name">Ghế thường</span>
                              </div>
                              <div className="col-12 col-lg-3 box-chair d-justify-align mt-2 mt-lg-0">
                                  <img src={chair5} alt="/" />
                                  <span className="chair-name">Ghế Vip</span>
                              </div>
                              <div className="col-12 col-lg-3 box-total d-justify-align mt-2 mt-lg-0">
                                  <p>Tổng tiền</p>
                                  <span className="total">12020 ₫</span>
                              </div>
                              <div className="col-12 col-lg-3 box-time d-justify-align mt-2 mt-lg-0">
                                  <p> Thời gian còn lại</p>
                                  <span className="time-select">{minutes}:{seconds}</span>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-12 col-lg-3 book-right">
                      <div id="js-book-right">
                          <div className="film-info row">
                              <div className="col-5">
                                  <div className="info-img">
                                      <img src={thongTinPhim.hinhAnh} alt={thongTinPhim.hinhAnh}/>
                                  </div>
                              </div>
                              <div className="col-7">
                                  <div className="film-name">
                                      <h5>{thongTinPhim.tenPhim}</h5>
                                      <span>2D phụ đề</span>
                                  </div>
                              </div>
                          </div>

                          <span className="book-border"></span>

                          <div className="show-time mt-2">
                              <div className="row">
                                  <div className="col-5 show-time-title">
                                      Thể loại
                                  </div>
                                  <div className="col-7 show-time-content">
                                      Hành động, phiêu lưu
                                  </div>
                              </div>
                              <div className="row mt-2">
                                  <div className="col-5 show-time-title">
                                      Thời lượng
                                  </div>
                                  <div className="col-7 show-time-content">
                                      150 phút
                                  </div>
                              </div>
                          </div>

                          <span className="book-border"></span>

                          <div className="detail-info">
                              <div className="row">
                                  <div className="col-5 show-time-title">
                                      Địa chỉ
                                  </div>
                                  <div className="col-7 show-time-content">
                                      {thongTinPhim.diaChi}
                                  </div>
                              </div>

                              <div className="row mt-2">
                                  <div className="col-5 show-time-title">
                                      Cụm rạp
                                  </div>
                                  <div className="col-7 show-time-content">
                                      {thongTinPhim.tenCumRap}
                                  </div>
                              </div>

                              <div className="row mt-2">
                                  <div className="col-5 show-time-title">
                                      Rạp chiếu
                                  </div>
                                  <div className="col-7 show-time-content">
                                      {thongTinPhim.tenRap}
                                  </div>
                              </div>

                              <div className="row mt-2">
                                  <div className="col-5 show-time-title">
                                      Ngày chiếu
                                  </div>
                                  <div className="col-7 show-time-content">
                                      {thongTinPhim.ngayChieu}
                                  </div>
                              </div>
                              <div className="row mt-2">
                                  <div className="col-5 show-time-title">
                                      Giờ chiếu
                                  </div>
                                  <div className="col-7 show-time-content">
                                      {thongTinPhim.gioChieu}
                                  </div>
                              </div>
                              <div className="row mt-2">
                                  <div className="col-5 show-time-title">
                                      Ghế ngồi
                                  </div>
                                  <div className="col-7 show-time-content">
                                      S1
                                  </div>
                              </div>
                              <div className="row btn-next mt-3">
                                  <button type="button" className="btn btn-danger">Tiếp tục</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default Checkout;