export const loadingReducer = (state = false, {type}) => {
    if (type.endsWith('REQUEST')) {
        return true;
    } else {
        return false;
    }
};