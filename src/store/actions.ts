// Constants
import * as types from "./constants";

// Interfaces
import { IUser } from "../interfaces";

// Export set menu status action
export const setMenuStatus = (payload: boolean) => ({
    type: types.SET_MENU_STATUS,
    payload
});

// Export set site nav status action
export const setNavStatus = (payload: boolean) => ({
    type: types.SET_NAV_STATUS,
    payload
});

// Export set user action
export const setUser = (payload: IUser) => ({
    type: types.SET_USER,
    payload
});