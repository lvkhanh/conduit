import {FETCH_CURRENT_USER_SUCCESS} from '../actions/currentUser';

export const currentUserReducer = (state = null, {type, currentUser}) => {
    switch (type) {
        case FETCH_CURRENT_USER_SUCCESS:
            return currentUser;
        default:
            return state;
    }
};