// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

// App
import App from "./App";

// Store
import store from "./store";

// Render app
ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById("root")
);
