import {FETCH_USER_SUCCESS, FETCH_USER_FAILED} from '../actions/signIn';

export const invalidInfoReducer = (state = false, {type}) => {
    switch (type) {
        case FETCH_USER_SUCCESS:
            return false;
        case FETCH_USER_FAILED:
            return true;
        default:
            return state;
    }
};