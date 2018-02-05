export const LOG_OUT = 'LOG_OUT';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const logOut = () => ({type: LOG_OUT});
export const updateUserRequest = (user) => ({type: UPDATE_USER_REQUEST, user});
export const updateUserSuccess = (currentUser) => ({type: UPDATE_USER_SUCCESS, currentUser});
export const updateUserFailed = (error) => ({type: UPDATE_USER_FAILED, error});