import {CHANGE_LANG, IS_LOGIN, NAVIGATE, SET_ADD_PHONE, SET_SEARCH_DATA, USER_ID} from "../const/types";
import {langs} from "../const/const";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    lang: langs.UA,
    whoAreLookingFor: null,
    isLogin: false,
    userID: AsyncStorage.getItem("UserId"),
    addPhone: "",
    pathname: "",
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANG:
            return {...state, lang: action.payload}
        case SET_SEARCH_DATA:
            return {...state, whoAreLookingFor: action.payload}
        case SET_ADD_PHONE:
            return {...state, addPhone: action.payload}
        case IS_LOGIN:
            return {...state, isLogin: action.payload}
        case USER_ID:
            return {...state, userID: action.payload}
        case NAVIGATE:
            return {...state, pathname: action.payload}
        default:
            return state
    }
};