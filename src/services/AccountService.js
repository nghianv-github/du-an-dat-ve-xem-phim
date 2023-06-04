import {BaseService} from "./BaseService";

export class AccountService extends BaseService {
    constructor() {
        super();
    }

    login = (info) => { // {taiKhoan: '', matKhau: '' }
        return this.post('api/QuanLyNguoiDung/DangNhap', info);
    }

    bookingHistory = () => {
        return this.post('api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }

}

export const accountService = new AccountService();