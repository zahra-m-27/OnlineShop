import * as actionTypes from './action-types';
import instance from "../../axios-orders";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        }
        instance.post('/posts', authData)
            .then( response => {
                console.log(response);
                localStorage.setItem('token', 'kjhgfrsezdfxgchvbjnlkfvgre')
                localStorage.setItem('expire_date', '300000');
                dispatch(authSuccess({
                    token: 'kjhgfrsezdfxgchvbjnlkfvgre',
                    userId: 1
                }))
            }).catch(err => {
                console.log(err);
                dispatch(authFail(err));
        })
    }
}

export const authLogOut = () => {
    localStorage.clear();
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}