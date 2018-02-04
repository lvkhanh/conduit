export const FETCH_CURRENT_USER_REQUEST = 'FETCH_CURRENT_USER_REQUEST';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILED = 'FETCH_CURRENT_USER_FAILED';

export const getCurrentUser = () => ({
    type: FETCH_CURRENT_USER_REQUEST
});

export const getCurrentUserSuccess = (currentUser) => ({
    type: FETCH_CURRENT_USER_SUCCESS,
    currentUser
});

export const getCurrentUserFailed = (error) => ({
    type: FETCH_CURRENT_USER_FAILED,
    error
});


