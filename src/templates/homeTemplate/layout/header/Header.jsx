import "./header.scss";
import React, {useState, useEffect} from "react";
import {HiOutlineSearch, HiOutlineUser} from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import {NavLink} from "react-router-dom";
import ContentWrapper from "../../../../conponents/contentWrapper/ContentWrapper";
import {history} from "../../../../App";
import {useDispatch, useSelector} from "react-redux";
import {openModalAccount} from "../../../../redux/stores/ModalAccountSlide";
import {logoutAccount} from "../../../../redux/stores/AccountSlide";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const dispatch = useDispatch();
    const {userLogin} = useSelector(state => state.accountSlide);


    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    const renderLogin = () => {
        if(Object.keys(userLogin).length === 0){
            return (
                <li
                    className="menuItem"
                    onClick={() => dispatch(openModalAccount({
                        visible: true,
                        isRegister: false
                    }))}
                >
                    <HiOutlineUser />
                </li>
            )
        }
        return (
            <li className="menuItem nav-item dropdown">
                <span className="menuItem nav-link dropdown-toggle p-0" id="navbarDarkDropdownMenuLink"
                      role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Xin chào {userLogin.hoTen.toUpperCase()}
                </span>
                <ul className="dropdown-menu dropdown-menu-white"
                    aria-labelledby="navbarDarkDropdownMenuLink">
                    <li>
                        <span className="dropdown-item"
                              onClick={() => history.push('/tai-khoan')}>Tài khoản
                        </span>
                    </li>
                    <li>
                        <span className="dropdown-item"
                              onClick={() => dispatch(logoutAccount())}>Đăng xuất
                        </span>
                    </li>
                </ul>
            </li>
        )
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            // navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                    <NavLink to={'/'}>
                        <img src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo-small.png" alt="" />
                    </NavLink>
                </div>
                <ul className="menuItems">
                    <li
                        className="menuItem"
                        onClick={() => history.push('danh-sach-phim')}
                    >
                        Danh sách phim
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => history.push('lien-he')}
                    >
                        Liên hệ
                    </li>

                    {renderLogin()}

                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Tìm kiếm phim..."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;
