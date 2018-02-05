import {FETCH_CURRENT_USER_SUCCESS} from '../actions/currentUser';
import {FETCH_USER_SUCCESS} from '../actions/signIn';
import {LOG_OUT, UPDATE_USER_SUCCESS} from '../actions/setting';

export const currentUserReducer = (state = null, {type, currentUser}) => {
    switch (type) {
        case FETCH_CURRENT_USER_SUCCESS:
        case FETCH_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return currentUser;
        case LOG_OUT:
            return null;
        default:
            return state;
    }
};