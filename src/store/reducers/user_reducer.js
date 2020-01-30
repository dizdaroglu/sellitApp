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

export default (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_USER:
            return registerUser(state, action);

        default:
            return state;
    }
}