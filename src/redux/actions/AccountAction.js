import {accountService} from "../../services/AccountService";
import {setInfoAccount, setInfoLogin} from "../stores/AccountSlide";
import {openModalAccount} from "../stores/ModalAccountSlide";
import {createNotification} from "../../utils/notification";

export const loginAction = (accInfo) => {
    return async (dispatch) => {
        try {
            const result = await accountService.login(accInfo);
            dispatch(setInfoLogin(result.data.content))
            dispatch(openModalAccount({
                visible: false
            }))
            createNotification('success', 'Đăng nhập thành công');
        }catch (e) {
            createNotification('warning', 'Thông tin tài khoản hoặc mật khẩu không chính xác');
        }
    }
}

export const bookingHistoryAction = () => {
    return async (dispatch) => {
        try {
            const result = await accountService.bookingHistory();
            if(result.data.statusCode === 200){
                dispatch(setInfoAccount(result.data.content))
            }
        }catch (e) {
            console.log('bookingHistoryAction', e);
        }
    }
}