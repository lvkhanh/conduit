import {combineReducers} from 'redux';

import {loadingReducer as loading} from './loading';
import {currentUserReducer as currentUser} from './currentUser';
import {invalidInfoReducer as invalidInfo} from './signIn';


const rootReducer = combineReducers({
    loading,
    currentUser,
    invalidInfo
});

export default rootReducer;