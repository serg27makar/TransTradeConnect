import {
    CHANGE_LANG, CLEAR_PHONES, EDIT_CLIENT,
    EDIT_PHONES,
    IS_LOGIN,
    NAVIGATE,
    SET_ADD_PHONE,
    SET_ADD_PHONES,
    SET_SEARCH_DATA,
    TOGGLE_MENU,
    USER_ID
} from "../const/types";
import {langs} from "../const/const";

const initialState = {
    lang: langs.UA,
    whoAreLookingFor: null,
    editClient: null,
    isLogin: false,
    isOpen: false,
    userID: "",
    addPhone: "",
    addPhones: [],
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
        case SET_ADD_PHONES:
            const addPhones = state.addPhones;
            addPhones.push(action.payload)
            return {...state, addPhones}
        case CLEAR_PHONES:
            return {...state, addPhones: []}
        case IS_LOGIN:
            return {...state, isLogin: action.payload}
        case EDIT_PHONES:
            const editPhones = state.addPhones
            editPhones.splice(action.payload.index, 1, action.payload.phone)
            return {...state, addPhones: editPhones}
        case USER_ID:
            return {...state, userID: action.payload}
        case NAVIGATE:
            return {...state, pathname: action.payload}
        case EDIT_CLIENT:
            return {...state, editClient: action.payload}
        case TOGGLE_MENU:
            return {...state, isOpen: action.payload}
        default:
            return state
    }
};