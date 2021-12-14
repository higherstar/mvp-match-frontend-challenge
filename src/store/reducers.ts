// Dependencies
import * as types from "./constants";

export interface IState {
    showMenu: boolean;
    showNav: boolean;
}

// Initial state
const initialState: IState = {
    showMenu: true,
    showNav: false,
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

        default:
            return state;
    }
};

// Export reducer
export default reducer;
