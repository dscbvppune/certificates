import { LOGIN_USER, LOGOUT_USER } from "../constants";

function authReducer(state = {}, action){
    switch (action.type) {
        case LOGIN_USER:
            const newUserState = {
                ...state,
                user: action.payload
            };
            return newUserState;
        case LOGOUT_USER:
            const updatedState = {
                ...state,
                user: action.payload
            };
            return updatedState;
        default:
            return state;
    }
}

export default authReducer;