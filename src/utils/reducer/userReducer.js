import {CHANGE_LANG, SET_SEARCH_DATA} from "../const/types";
import {langs} from "../const/const";

const initialState = {
    lang: langs.UA,
    whoAreLookingFor: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANG:
            return {...state, lang: action.payload}
        case SET_SEARCH_DATA:
            return {...state, whoAreLookingFor: action.payload}
        default:
            return state
    }
};