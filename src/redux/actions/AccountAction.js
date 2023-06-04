import {accountService} from "../../services/AccountService";
import {setInfoAccount, setInfoLogin} from "../stores/AccountSlide";
import {openModalAccount} from "../stores/ModalAccountSlide";

export const loginAction = (accInfo) => {
    return async (dispatch) => {
        try {
            const result = await accountService.login(accInfo);
            if(result.data.statusCode === 200){
                dispatch(setInfoLogin(result.data.content))
            }
            dispatch(openModalAccount({
                visible: false
            }))
        }catch (e) {
            console.log('LoginAction', e);
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