import {Route} from "react-router-dom";
import React, {Fragment} from 'react';
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import ModalAccount from "../../conponents/modalAccount/modalAccount";

function HomeTemplate(props) {
    const {Component, ...resetParam} = props;

    return <Route path={resetParam.path} render={(propsRoute) => {
        return <Fragment>
            <Header {...propsRoute} />
            <ModalAccount />

            <main className="main-content">
                <Component {...propsRoute} />
            </main>

            <Footer {...propsRoute} />
        </Fragment>
    }} />
}

export default HomeTemplate;