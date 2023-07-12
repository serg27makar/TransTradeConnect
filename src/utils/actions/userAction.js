import {
    CHANGE_LANG, CLEAR_PHONES, EDIT_CLIENT,
    EDIT_PHONES,
    IS_LOGIN,
    NAVIGATE,
    SET_ADD_PHONE,
    SET_ADD_PHONES,
    SET_SEARCH_DATA,
    USER_ID
} from "../const/types";

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

export const setAddPhones = data => (
    {
        type: SET_ADD_PHONES,
        payload: data,
    }
);

export const editPhones = data => (
    {
        type: EDIT_PHONES,
        payload: data,
    }
);

export const setIsLogin = data => (
    {
        type: IS_LOGIN,
        payload: data,
    }
);

export const setUserId = data => (
    {
        type: USER_ID,
        payload: data,
    }
);

export const setNavigate = data => (
    {
        type: NAVIGATE,
        payload: data,
    }
);

export const setEditClient = data => (
    {
        type: EDIT_CLIENT,
        payload: data,
    }
);

export const clearPhones = () => (
    {
        type: CLEAR_PHONES,
    }
);
