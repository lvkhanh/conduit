import React, {PureComponent, Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';
import Api from './services/api';
import Handle from './services/handle';

import {YOUR_FEED_UNI_ID, GLOBAL_FEED_UNI_ID} from './Tabs';

const LIMIT = {
    limit: 10
};

class Feeds extends Component {

    constructor (props) {
        super(props);
        this.state = {
            articles: [],
            loading: true
        }
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    componentDidMount () {
        this._getFeeds(this.props);
    }

    componentWillReceiveProps ({activeFeed}) {
        if (this.props.activeFeed === activeFeed) return;

        this.setState({
            articles: [],
            loading: true
        });
        this._getFeeds({activeFeed});
    }

    _getFeeds ({activeFeed}) {
        if (!activeFeed) return;

        let getFeeds;

        if (activeFeed === YOUR_FEED_UNI_ID) {
            getFeeds = Api.articlesFeed(LIMIT);
        } else if (activeFeed === GLOBAL_FEED_UNI_ID) {
            getFeeds = Api.articlesList(LIMIT)
        } else {
            getFeeds = Api.articlesList({
                ...LIMIT,
                tag: activeFeed
            });
        }

        getFeeds.then(response => {
            this.setState({
                articles: response.articles,
                loading: false
            })
        })
    }

    handleFavorite (e, a) {
        Handle.favorite(e, this.props.history.push, a, article => {
            this.setState({
                articles: this.state.articles.map(_article => {
                    if (_article.slug === article.slug) {
                        _article.favoritesCount = article.favoritesCount;
                        _article.favorited = article.favorited;
                    }
                    return _article;
                })
            });
        });
    }

    render () {
        if (this.state.loading) {
            return (
                <div className="article-preview">
                    Loading articles...
                </div>
            );
        }

        if (!this.state.articles.length) {
            return (
                <div className="article-preview">
                    No articles are here... yet.
                </div>
            );
        }

        return (
            <div>
                {
                    this.state.articles.map(article => (
                        <div className="article-preview" key={article.slug}>
                            <div className="article-meta">
                                <Link to={`/profile/${article.author.username}`} className="author">
                                    <img src={article.author.image} />
                                </Link>
                                <div className="info">
                                    <Link to={`/profile/${article.author.username}`} className="author">{article.author.username}</Link>
                                    <span className="date">{moment(article.createdAt).format('MMMM DD, YYYY')}</span>
                                </div>
                                <button className={`btn btn-sm pull-xs-right ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`} onClick={(e) => this.handleFavorite(e, article)}>
                                    <i className="ion-heart"></i> {article.favoritesCount}
                                </button>
                            </div>
                            <Link to={`/article/view/${article.slug}`} className="preview-link">
                                <h1>{article.title}</h1>
                                <p>{article.description}</p>
                                <span>Read more...</span>
                                <ul className="tag-list">
                                    {
                                        article.tagList.map((tag, index) => (
                                            <li key={index} className="tag-default tag-pill tag-outline">{tag}</li>
                                        ))
                                    }
                                </ul>
                            </Link>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default withRouter(Feeds);
