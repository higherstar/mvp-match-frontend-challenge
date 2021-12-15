// Dependencies
import React from "react";
import { useDispatch } from "react-redux";

// Router
import Router from "./router";

// Services
import { Storage } from "./services";

// Apis
import { AuthApi } from "./apis";

// Interfaces
import { IUser } from "./interfaces";

// Actions
import { setUser } from "./store/actions";

// Create app
const App = () => {
    // Get dispatch from hook
    const dispatch = useDispatch();

    // Get token
    const token = Storage.getItem(process.env.ACCESS_TOKEN_KEY || "access_token");

    // Get user from token
    if (token) {
        AuthApi.me(token)
            .then(res => {
                if (res.data.accessToken) {
                    // Store token to local storage
                    Storage.setItem(process.env.ACCESS_TOKEN_KEY || "access_token", res.data.accessToken);

                    if (res.data.user) {
                        // Get user from res
                        const user = res.data.user as Pick<IUser, "role" | "deposit">;

                        // Dispatch set user action
                        dispatch(setUser({
                            ...user,
                            token: true
                        }));
                    }
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    // Return app
    return (
        <Router />
    );
};

// Export app
export default App;
