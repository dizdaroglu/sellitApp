import * as types from '../types';
import { updatedObject } from '../utility';
const initialState = {
    userData: {
        uid: null,
        token: null,
        refToken: null
    }
}
const registerUser = (state, action) => {
    return updatedObject(state, {
        userData: {
            uid: action.payload.localId || false,
            token: action.payload.idToken || false,
            refToken: action.payload.refreshToken || false
        }
    })
}
const signUser = (state, action) => {
    return updatedObject(state, {
        userData: {
            uid: action.payload.localId || false,
            token: action.payload.idToken || false,
            refToken: action.payload.refreshToken || false

        }
    })
}
const autoSignIn = (state, action) => {
    return updatedObject(state, {
        userData: {
            uid: action.payload.user_id || false,
            token: action.payload.id_token || false,
            refToken: action.payload.refresh_token || false

        }
    })
}
export default (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_USER:
            return registerUser(state, action);
        case types.SIGN_USER:
            return signUser(state, action);
        case types.AUTO_SIGN_IN:
            return autoSignIn(state, action);

        case types.GET_USER_POST:
            return {
                ...state,
                userPosts: action.payload
            }
        case types.DELETE_USER_POST:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}