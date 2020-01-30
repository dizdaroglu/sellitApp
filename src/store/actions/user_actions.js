import * as types from '../types';
import axios from '../../utils/axios';
import { SIGNIN, SIGNUP, REFRESH } from '../../utils/key';


export const signUp = (data) => {

    const authData = {
        email: data.email,
        password: data.password,
        returnSecureToken: true
    }

    const request = axios.post(SIGNUP, authData)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return false
        })

    return {
        type: types.REGISTER_USER,
        payload: request
    }
}

export const signIn = (data) => {
    const authData = {
        email: data.email,
        password: data.password,
        returnSecureToken: true
    }

    const request = axios.post(SIGNIN, authData)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return false
        })
    return {
        type: types.SIGN_USER,
        payload: request
    }
}
export const autoSignIn = (refToken) => {
    const data = 'grant_type=refresh_token&refresh_token=' + refToken;
    const request = axios.post(REFRESH, data)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return false
        })
    return {
        type: types.AUTO_SIGN_IN,
        payload: request
    }
}