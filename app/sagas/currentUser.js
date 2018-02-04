import { call, put, takeEvery } from 'redux-saga/effects';
import {FETCH_CURRENT_USER_REQUEST, getCurrentUserSuccess, getCurrentUserFailed} from '../actions/currentUser';
import Api from '../services/api';
import Token from '../services/token';

function * getCurrentUser () {
    let token = Token.get();
    if (token) {
        try {
            const user = yield call(Api.currentUser, token);
            yield put(getCurrentUserSuccess(user));
        } catch (e) {
            yield put(getCurrentUserFailed(e));
        }
    } else {
        yield put(getCurrentUserSuccess(null));
    }
}

export default function * handleGetCurrentUser () {
    yield takeEvery(FETCH_CURRENT_USER_REQUEST, getCurrentUser);
};