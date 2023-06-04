import React from 'react';
import '../style.scss';
import {openModalAccount} from "../../../redux/stores/ModalAccountSlide";
import {useDispatch} from "react-redux";

function Register(props) {
    const dispatch = useDispatch();
    return (
        <div className="fromWrapper">
            <form action="#" method="post">
                <input type="text" placeholder="Email" name="email" />
                <input type="text" placeholder="Họ và tên" name="name" />
                <input type="text" placeholder="Tài khoản" name="name" />
                <input type="password" placeholder="Mật khẩu" name="password" />
                <div className="registerRedirect">
                    Quay lại màn hình
                    <span
                        onClick={() => {
                            dispatch(openModalAccount({
                                visible: true,
                                isRegister: false
                            }))
                        }}
                    >
                        đăng nhập
                    </span>
                </div>
                <div className="submitBtn">
                    <input type="submit" value="Đăng kí" />
                </div>
            </form>

        </div>
    );
}

export default Register;