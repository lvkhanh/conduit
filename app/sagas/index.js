import { all } from 'redux-saga/effects'
import currentUser from './currentUser';
import handleSignIn from './signIn';

export default function * () {
    yield all([
        currentUser(),
        handleSignIn()
    ]);
};