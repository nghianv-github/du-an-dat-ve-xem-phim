import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import configStore from "./redux/configStore";
import 'antd/dist/antd.css';
import './index.scss';
import {BASE_URL} from "./utils/settings/config";
import * as signalR from '@aspnet/signalr';
import {NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';

// ket noi den server socket
export  const connection = new signalR.HubConnectionBuilder().withUrl(`${BASE_URL}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

connection.start().then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <Provider store={configStore}>
            <App/>
            <NotificationContainer/>
        </Provider>
    );
}).catch(error => {
    console.log('index.js', error);
})



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
