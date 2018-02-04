import {combineReducers} from 'redux';

import {loadingReducer as loading} from './loading';
import {currentUserReducer as currentUser} from './currentUser';

const rootReducer = combineReducers({
    currentUser,
    loading
});

export default rootReducer;

