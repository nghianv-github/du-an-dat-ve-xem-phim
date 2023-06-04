import {theaterManagerService} from "../../services/TheaterManagerService";
import {getListMovieTheater} from "../stores/MovieTheaterSlide";

export const getMovieTheaterAction = () => {
    return async (dispatch) => {
        try {
            const result = await theaterManagerService.getListTheater();
            dispatch(getListMovieTheater(result.data.content))
        }catch (e) {
            console.log('layDanhSachRapAction', e);
        }
    }
}