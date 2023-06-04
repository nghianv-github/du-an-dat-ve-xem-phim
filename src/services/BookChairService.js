import {BaseService} from "./BaseService";

export class BookChairService extends BaseService {
    constructor() {
        super();
    }

    ttdv = () => {
        return {
            "maLichChieu": 0,
            "danhSachVe": [
                {
                    "maGhe": 0,
                    "giaVe": 0
                }
            ]
        }
    }

    ttpv = () => {
        return {
            thongTinPhim: {
                maLichChieu: '',
                tenCumRap: '',
                tenRap: '',
                diaChi: '',
                tenPhim: '',
                hinhAnh: '',
                ngayChieu: '',
                gioChieu: '',
            },
            danhSachGhe: [
                {
                    maGhe: '',
                    tenGhe: '',
                    maRap: '',
                    loaiGhe: '',
                    stt: '',
                    giaVe: '',
                    daDat: '',
                    taiKhoanNguoidat: '',
                }
            ]
        }
    }

    detailBookChair = (code) => {
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${code}`);
    }

    booking = (ttdv = this.ttdv()) => {
        return this.post(`api/QuanLyDatVe/DatVe`, ttdv);
    }

}

export const bookChairService = new BookChairService();