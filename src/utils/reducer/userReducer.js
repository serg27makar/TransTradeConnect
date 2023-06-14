import {CHANGE_LANG} from "../const/types";
import {langs} from "../const/const";

const initialState = {
    lang: langs.UA
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANG:
            return {...state, lang: action.payload}
        default:
            return state
    }
};