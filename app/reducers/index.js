import { combineReducers } from 'redux';

const initialState = {
    articles: {
        articles: [],
        articleCount: 0,
        isLoading: true
    },
    tabs: {
        tabs: ['Global Feed'],
        activeTab: null,
    }
};

const articles = (state = initialState.articles, action) => {
};

var rootReducer = combineReducers({
    articles
});

export default rootReducer
