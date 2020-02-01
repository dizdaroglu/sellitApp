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

    return {
        type: types.GET_ARTICLES,
        payload: request
    }
}