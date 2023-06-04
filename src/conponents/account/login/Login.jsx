import React, {useState} from 'react';
import '../style.scss';
import {useDispatch} from "react-redux";
import {openModalAccount} from "../../../redux/stores/ModalAccountSlide";
import {loginAction} from "../../../redux/actions/AccountAction";

function Login(props) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAction({
            taiKhoan: username,
            matKhau: password
        }));
    }

    const handleChangeValue = (e) => {
        e.preventDefault();
        let {name, value} = e.target;
        if(name === 'username'){
            setUsername(value);
        }
        if(name === 'password'){
            setPassword(value);
        }
    }

    return (
        <div className="fromWrapper">
            <form onSubmit={handleSubmit} action="#" method="post">
                <input type="text" placeholder="Tài khoản" name="username"
                       onChange={(e) => {
                           handleChangeValue(e);
                       }}
                />
                <input type="password" placeholder="Mật khẩu" name="password"
                       onChange={(e) => {
                           handleChangeValue(e);
                       }}
                />
                <div className="registerRedirect">
                    Bạn chưa có tài khoản?
                    <span
                        onClick={() => {
                            dispatch(openModalAccount({
                                visible: true,
                                isRegister: true
                            }))
                        }}
                    >
                        đăng kí tại đây!
                    </span>
                </div>
                <div className="submitBtn">
                    <input type="submit" value="Đăng nhập" />
                </div>
            </form>
        </div>
    );
}

export default Login;