export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

export const getUser = (email, password) => {
    return {
        type: FETCH_USER_REQUEST,
        email,
        password
    };
};

export const getUserSuccess = (currentUser) => {
    return {
        type: FETCH_USER_SUCCESS,
        currentUser
    };
}

export const getUserFailed = error => {
    return {
        type: FETCH_USER_FAILED,
        error
    };
}