import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./stores/HomeSlice";
import MovieTheaterSlide from "./stores/MovieTheaterSlide";
import ModalAccountSlide from "./stores/ModalAccountSlide";
import AccountSlide from "./stores/AccountSlide";
import BookChairSlide from "./stores/BookChairSlide";

const rootReducer = {
    // Khai báo reducer tại đây
    home: HomeSlice,
    movieTheater: MovieTheaterSlide,
    modalAccountSlide: ModalAccountSlide,
    accountSlide: AccountSlide,
    bookChairSlide: BookChairSlide
}


/**
 * https://viblo.asia/p/tim-hieu-redux-toolkit-phan-3-gDVK2Lj2lLj
 * https://stackoverflow.com/questions/69502147/changing-from-redux-to-redux-toolkit
 * Mặc định đã có redux thunk`
 */
export const store = configureStore({
    reducer: rootReducer
});

export default store