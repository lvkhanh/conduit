import React, { PureComponent } from 'react';
import moment from 'moment';
import Handle from './services/handle';

class FollowButton extends PureComponent {
    constructor (props) {
        super(props);
        let {article: {author = {}}} = props;
        this.state = {
            following: author.following
        }
    }

    handleClick (e) {
        Handle.followUser(e, this.props.article, profile => {
            let article = {...this.props.article};
            article.author.following = profile.following;
            this.props.onClick(article);
        });
    }

    render () {
        let {author = {}} = this.props.article,
            {username, following = false} = author,
            text, buttonClass, iconClass;

        if (following) {
            text = 'Unfollow';
            buttonClass = 'btn-secondary';
            iconClass = 'ion-minus-round';
        } else {
            text = 'Follow';
            buttonClass = 'btn-outline-secondary';
            iconClass = 'ion-plus-round';
        }
        return (
            <button className={`btn btn-sm ${buttonClass}`} onClick={this.handleClick.bind(this)}>
                <i className={iconClass}></i>
                &nbsp;
                {text} {username}
            </button>
        );
    }
}

class FavoriteButton extends PureComponent {

    handleClick (e) {
        Handle.favorite(e, this.props.article, this.props.onClick);
    }

    render () {
        let {favorited, favoritesCount} = this.props.article;
        return (
            <button className={`btn btn-sm ${favorited ? 'btn-primary' : 'btn-outline-primary'}`} onClick={this.handleClick.bind(this)}>
                <i className="ion-heart"></i>
                &nbsp;
                {favorited ? 'Unfavorite' : 'Favorite'} Article
                <span className="counter">({favoritesCount})</span>
            </button>
        );
    }
}

class ArticleMeta extends PureComponent {

    constructor (props) {
        super(props);
        this.state = {
            article: this.props.article
        };
    }

    componentWillReceiveProps ({article}) {
        this.setState({article});
    }

    render () {
        let {createdAt, author = {}} = this.state.article,
            {image = '', username = ''} = author;
        return (
            <div className="article-meta">
                <a href="#"><img src={image} /></a>
                <div className="info">
                    <a href="#" className="author">{username}</a>
                    <span className="date">{moment(createdAt).format('MMMM DD, YYYY')}</span>
                </div>
                <FollowButton article={this.state.article} onClick={this.props.onChange}/>
                &nbsp;&nbsp;
                <FavoriteButton article={this.state.article} onClick={this.props.onChange}/>
            </div>
        );
    }
}

export default ArticleMeta;