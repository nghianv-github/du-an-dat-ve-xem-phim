import { Modal } from 'antd';
import React, {Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeModalAccount} from "../../redux/stores/ModalAccountSlide";
import Login from "../account/login/Login";
import Register from "../account/register/Register";
const ModalAccount = () => {
    const dispatch = useDispatch();
    const {visible, isRegister} = useSelector(state => state.modalAccountSlide);

    const hanldeClose = () => {
        dispatch(closeModalAccount({
            'visible': false
        }))
    };

    const contentModal = () => {
        if(!isRegister){
            return <Login />
        }else{
            return <Register />
        }
    }

    return (
        <Fragment>
            <Modal
                title={!isRegister ? 'Đăng nhập': 'Đăng kí'}
                top
                open={visible}
                onCancel={() => hanldeClose()}
                footer={false}
                width={768}
            >
                {contentModal()}
            </Modal>
        </Fragment>
    );
};
export default ModalAccount;