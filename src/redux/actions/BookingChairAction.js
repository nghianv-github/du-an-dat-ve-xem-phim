import {bookChairService} from "../../services/BookChairService";
import {datVe, setMaLichChieu} from "../stores/BookChairSlide";

export const quanLyDatVeAction = (code) => {
    return async (dispatch) => {
        try {
            const result = await bookChairService.detailBookChair(code);
            if(result.status === 200) {
                dispatch(setMaLichChieu(result.data.content));
            }

        }catch (e) {
            console.log('getChiTetPhongVeAction', e);
        }
    }
}

export const datGheAction = (ghe, maLichChieu) => {
    return async (dispatch, getState) => {
        await dispatch(datVe(ghe));
        let {danhSachGheDangDat} = getState().bookChairSlide;
        let {taiKhoan} = getState().accountSlide.userLogin;

        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
        console.log('danhSachGheDangDat', danhSachGheDangDat);
        // Bắt socket lên server
        // connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
    }
}