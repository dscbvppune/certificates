import { combineReducers } from "redux";
import authReducer from "./login.reducer";

export const reducer = combineReducers({authReducer});