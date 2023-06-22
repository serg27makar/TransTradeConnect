import {CHANGE_LANG, IS_LOGIN, SET_SEARCH_DATA} from "../const/types";
import {langs} from "../const/const";

const initialState = {
    lang: langs.UA,
    whoAreLookingFor: null,
    isLogin: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANG:
            return {...state, lang: action.payload}
        case SET_SEARCH_DATA:
            return {...state, whoAreLookingFor: action.payload}
        case IS_LOGIN:
            return {...state, isLogin: action.payload}
        default:
            return state
    }
};