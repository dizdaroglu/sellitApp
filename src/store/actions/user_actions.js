import * as types from '../types';
import axios from '../../utils/axios';
import { SIGNIN, SIGNUP, REFRESH } from '../../utils/key';
import { setTokens } from '../../utils/misc'

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
export const getUserPosts = (uid) => {
    const request = axios.get(`/articles.json?orderBy=\"uid\"&equalTo=\"${uid}\"`)
        .then(res => {
            let articles = [];

            for (let key in res.data) {
                articles.push({
                    ...res.data[key],
                    id: key
                })
            }
            return articles;
        })
        .catch(error => {
            return false;
        })
    return {
        type: types.GET_USER_POST,
        payload: request
    }
}
export const deleteUserpost = (postId, userData) => {

    const promise = new Promise((resolve, reject) => {

        const request = axios.delete(`/articles/${postId}.json?auth=${userData.token}`)
            .then(res => {
                resolve({ deletePost: true })
            })
            .catch(error => {
                const signIn = autoSignIn(userData.refToken);

                signIn.payload.then(res => {
                    let newTokens = {
                        token: res.id_token,
                        refToken: res.refresh_token,
                        uid: res.user_id
                    }
                    setTokens(newTokens, () => {
                        axios.delete(`/articles/${postId}.json?auth=${userData.token}`)
                            .then(res => {
                                resolve({
                                    userData: newTokens,
                                    deletePost: true
                                })
                            })
                    })
                })
            })
    })

    return {
        type: types.DELETE_USER_POST,
        payload: promise
    }
}