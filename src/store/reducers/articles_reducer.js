import * as types from '../types';


export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_ARTICLES:
            return {
                ...state,
                list: action.payload
            }

        default:
            return state;
    }
}