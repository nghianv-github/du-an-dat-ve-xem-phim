import {BaseService} from "./BaseService";
import {GROUP_ID} from "../utils/settings/config";

export class TheaterManagerService extends BaseService {
    constructor() {
        super();
    }

    getListTheater = () => {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`);
    }


    getDetailMovie = (movieId) => {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`);
    }
}

export const theaterManagerService = new TheaterManagerService();