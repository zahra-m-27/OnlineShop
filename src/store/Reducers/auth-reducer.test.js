import authReducer from "./auth-reducer";
import * as ActionTypes from '../Actions/action-types';

describe('Testing Auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false
        })
    });
    it('should store token', () => {
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false
            },
            {
                type:ActionTypes.AUTH_SUCCESS,
                token: 'edrfghylkjnhbgcfxfgh',
                userId: 1
        })).toEqual({
            token: 'edrfghylkjnhbgcfxfgh',
            userId: 1,
            error: null,
            loading: false
        })
    });
})