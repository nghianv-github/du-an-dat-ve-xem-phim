import {bookChairService} from "../../services/BookChairService";
import {datVe, datVeHoanTat, setMaLichChieu} from "../stores/BookChairSlide";
import {connection} from "../../index";

export const quanLyDatVeAction = (code) => {
    return async (dispatch) => {
        try {
            const result = await bookChairService.detailBookChair(code);
            if(result.status === 200) {
                dispatch(setMaLichChieu(result.data.content));
            }

        }catch (e) {
            console.log('quanLyDatVeAction', e);
        }
    }
}

export const datVeAction = (ttdv = bookChairService.ttdv()) => {
    return async (dispatch, getState) => {
        try {
            // dispatch(LoadingReducer.actions.setLoading(DISPLAY_LOADING))
            await bookChairService.booking(ttdv);

            //Đăt vé thành công load lại API phòng vé
            await dispatch(quanLyDatVeAction(ttdv.maLichChieu))

            // set lại giá tiền
            await dispatch(datVeHoanTat());

            // đặt vé thành công bắn lên socket
            let {taiKhoan} = getState().accountSlide.userLogin;
            connection.invoke('datGheThanhCong', taiKhoan, ttdv.maLichChieu);

            // await dispatch(LoadingReducer.actions.setLoading(HIDE_LOADING))

            //chuyển sang tab kết quả
            // dispatch(QuanLyDatVeReducer.actions.chuyenTab());
        }catch (e) {
            // dispatch(LoadingReducer.actions.setLoading(HIDE_LOADING))
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
        // Bắt socket lên server
        connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
    }
}