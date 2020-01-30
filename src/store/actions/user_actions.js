import * as types from '../types';
import axios from '../../utils/axios';
import { SIGNIN, SIGNUP } from '../../utils/key';


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