import axios from '../../utils/axios';
import * as types from '../types';
import { FIREBASEURL } from '../../utils/key';

export const getArticles = (category) => {
    let URL = `${FIREBASEURL}/articles.json`;

    if (category !== "All") {
        URL = `${URL}/?orderBy=\"category\"&equalTo=\"${category}\"`
    }
    const request = axios.get(URL)
        .then(res => {
            const articles = [];
            console.log("clothing: ", res.data)

            for (let key in res.data) {
                articles.push({
                    ...res.data[key],
                    id: key
                })
            }
            return articles
        })
        .catch(error => {
            return false
        })
    console.log("Request: ", request)
    return {
        type: types.GET_ARTICLES,
        payload: request
    }
}

export const addArticle = (data, token) => {

    const request = axios.post(`/articles.json?auth=${token}`, data)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return false
        })

    return {
        type: types.ADD_ARTICLES,
        payload: request
    }
}

export const resetArticle = () => {
    return {
        type: types.RESET_ARTICLE,
        payload: ""
    }
}