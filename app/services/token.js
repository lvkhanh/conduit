import storage from './storage';

export const TOKEN_KEY = 'jwtToken';

export default {
    get () {
        return storage.get(TOKEN_KEY);
    },

    set (token) {
        storage.set(TOKEN_KEY, token);
    },

    remove () {
        storage.remove(TOKEN_KEY);
    }
}