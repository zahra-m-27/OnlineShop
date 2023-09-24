import * as actionTypes from '../Actions/action-types';
import {updateObject} from "../utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        loading: false,
        userId: 1,
        error: null
    })
}

const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
}

const authLogOut = (state, action) => {
    return updateObject(state, {token: null, userId: null});
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogOut(state, action);
        default:
            return state;
    }
}

export default authReducer;