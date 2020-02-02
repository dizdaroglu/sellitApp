import * as types from '../types';


export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_ARTICLES:
            return {
                ...state,
                list: action.payload
            }
        case types.ADD_ARTICLES:
            return {
                ...state,
                newArticle: action.payload
            }
        case types.RESET_ARTICLE:
            return {
                ...state,
                newArticle: action.payload
            }
        default:
            return state;
    }
}