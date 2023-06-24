import {CHANGE_LANG, IS_LOGIN, NAVIGATE, SET_ADD_PHONE, SET_SEARCH_DATA} from "../const/types";

export const changeLang = lang => (
    {
        type: CHANGE_LANG,
        payload: lang,
    }
);

export const setSearchData = data => (
    {
        type: SET_SEARCH_DATA,
        payload: data,
    }
);

export const setAddPhone = data => (
    {
        type: SET_ADD_PHONE,
        payload: data,
    }
);

export const setIsLogin = data => (
    {
        type: IS_LOGIN,
        payload: data,
    }
);

export const setNavigate = data => (
    {
        type: NAVIGATE,
        payload: data,
    }
);