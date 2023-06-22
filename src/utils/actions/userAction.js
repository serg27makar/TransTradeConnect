import {CHANGE_LANG, IS_LOGIN, SET_SEARCH_DATA} from "../const/types";

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

export const setIsLogin = data => (
    {
        type: IS_LOGIN,
        payload: data,
    }
);