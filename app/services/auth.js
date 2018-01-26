import Token from './token';

export const redirectIfNotAuthenticated = (push, to) => {
    if (!Token.get()) {
        push(to);
    }
};