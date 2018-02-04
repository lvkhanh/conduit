import { all } from 'redux-saga/effects'
import currentUser from './currentUser';

export default function * () {
    yield all([
        currentUser()
    ]);
};