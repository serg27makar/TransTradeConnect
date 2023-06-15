import {CHANGE_LANG, SET_SEARCH_DATA} from "../const/types";

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