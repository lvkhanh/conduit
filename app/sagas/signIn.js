import { call, put, takeEvery } from 'redux-saga/effects';
import {FETCH_USER_REQUEST, getUserSuccess, getUserFailed} from '../actions/signIn';
import Api from '../services/api';
import Token from '../services/token';
import Storage from '../services/storage';

function * signIn ({email, password}) {

    const {user, error} = yield call(Api.login, {email, password});

    if (user) {
        let {token, username} = user;
        Token.set(token);
        Storage.set('currentUsername', username);

        yield put(getUserSuccess(user));
    } else {
        yield put(getUserFailed(error));
    }
}

export default function * handleSignIn() {
    yield takeEvery(FETCH_USER_REQUEST, signIn);
};