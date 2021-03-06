// Dependencies
import * as types from "./constants";

// Interfaces
import { IState } from "../interfaces";

// Initial state
const initialState: IState = {
    showMenu: true,
    showNav: false,
    user: {
        email: "",
        role: "buyer",
        deposit: 0,
        token: false,
    },
    cart: []
};

// Create reducer
const reducer = (state = initialState, actions) => {
    switch (actions.type) {

        case types.SET_MENU_STATUS:
            return {
                ...state,
                showMenu: actions.payload
            };

        case types.SET_NAV_STATUS:
            return {
                ...state,
                showNav: actions.payload
            };

        case types.SET_USER:
            return {
                ...state,
                user: actions.payload
            };

        case types.ADD_CART:
            return {
                ...state,
                cart: actions.payload
            };

        default:
            return state;
    }
};

// Export reducer
export default reducer;
