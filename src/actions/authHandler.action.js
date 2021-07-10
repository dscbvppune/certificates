import { LOGIN_USER, LOGOUT_USER } from "../constants";

export function loginUser(payload){
    return {
        type: LOGIN_USER,
        payload
    }
}

export function logoutUser(payload){
    return {
        type: LOGOUT_USER,
        payload
    }
}