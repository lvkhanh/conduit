import React from 'react';
import {connect} from 'react-redux';
import Feeds from '../Feeds';
import GetArticals from "../sagas/articles";

const mapStateToProps = state => {
    return {
        articles: state.articles.articles,
        isLoading: state.articles.isLoading,
    }
};

function mapDispatchToProps(dispatch) {
    return {
        // likeArtical: (e, artical) => {
        //     e.preventDefault();
        //     return dispatch({type: 'LIKE_ARTICAL', payload: artical});
        // }
    }

};

const articles = connect(
    mapStateToProps,
    mapDispatchToProps
)(Feeds);

export default articles;
