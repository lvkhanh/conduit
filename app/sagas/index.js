import { all } from 'redux-saga/effects'
import currentUser from './currentUser';
import handleSignIn from './signIn';
import updateUser from './setting';

export default function * () {
    yield all([
        currentUser(),
        handleSignIn(),
        updateUser()
    ]);
};