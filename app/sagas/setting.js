import { call, put, takeEvery } from 'redux-saga/effects';
import {UPDATE_USER_REQUEST, updateUserSuccess, updateUserFailed} from '../actions/setting';
import Api from '../services/api';

function * _updateUser (action) {
    const {user, error} = yield call(Api.updateUser, action.user);
    if (user) {
        yield put(updateUserSuccess(user));
    } else {
        yield put(updateUserFailed(error));
    }
}

export default function * updateUser() {
    yield takeEvery(UPDATE_USER_REQUEST, _updateUser);
}
