// Constants
import * as types from "./constants";

// Export set menu status action
export const setMenuStatus = (value) => ({
    type: types.SET_MENU_STATUS,
    payload: value
});

// Export set site nav status action
export const setNavStatus = (value) => ({
    type: types.SET_NAV_STATUS,
    payload: value
});
