import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import history from "./history";
import App from "./app";

// socket connection
import "./socket";

ReactDOM.render(
    <Provider store={store} >
        <Router history={history} >
            <App />
        </Router>
    </Provider>,
    document.getElementById("app")
)