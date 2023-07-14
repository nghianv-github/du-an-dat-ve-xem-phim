import {createSlice} from "@reduxjs/toolkit";
import {bookChairService} from "../../services/BookChairService";

const initialState = {
    chiTietPhongVe: '', // bookChairService.ttpv() Chi tiết phòng vé
    danhSachGheDangDat: [], // Danh sách ghế đang đặt
    danhSachGheKhachDat: [{maGhe: 123}], // Danh sách ghế khách đặt
}

export const BookChairSlide = createSlice({
    name: 'bookChairSlide',
    initialState,
    reducers: {
        setMaLichChieu: (state, action) => {
            state.chiTietPhongVe = action.payload
        },
        datVe: (state, action) => {
            let gheCapNhat = state.danhSachGheDangDat,
                index = gheCapNhat.findIndex(ghe => ghe.maGhe === action.payload.maGhe);
            if(index !== -1){
                gheCapNhat.splice(index, 1);
            }else{
                gheCapNhat.push(action.payload);
            }
            state.danhSachGheDangDat = gheCapNhat
        },
        datVeHoanTat: (state, action) => {
            state.danhSachGheDangDat = [];
        },
        datGhe: (state, action) => {
            state.danhSachGheKhachDat = action.payload;
        },
    }
})

export const {setMaLichChieu, datVe, datVeHoanTat, datGhe} = BookChairSlide.actions;

export default BookChairSlide.reducer;