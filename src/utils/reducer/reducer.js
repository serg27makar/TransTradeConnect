import {combineReducers} from "redux";
import {userReducer} from "./userReducer";

export const RootReducer = combineReducers({users: userReducer})