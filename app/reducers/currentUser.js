import {FETCH_CURRENT_USER_SUCCESS} from '../actions/currentUser';
import {FETCH_USER_SUCCESS} from '../actions/signIn';

export const currentUserReducer = (state = null, {type, currentUser}) => {
    switch (type) {
        case FETCH_CURRENT_USER_SUCCESS:
        case FETCH_USER_SUCCESS:
            return currentUser;
        default:
            return state;
    }
};