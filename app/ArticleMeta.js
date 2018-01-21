import React, { PureComponent } from 'react';
import moment from 'moment';

const FollowButton = ({following, username}) => {
    let text, buttonClass, iconClass;
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
        <button className={`btn btn-sm ${buttonClass}`}>
            <i className={iconClass}></i>
            &nbsp;
            {text} {username}
        </button>
    );
};

const FavoriteButton = ({favorited, favoritesCount}) => {
    return (
        <button className={`btn btn-sm ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}>
            <i className="ion-heart"></i>
            &nbsp;
            {favorited ? 'Unfavorite' : 'Favorite'} Article
            <span className="counter">({favoritesCount})</span>
        </button>
    );
}

class ArticleMeta extends PureComponent {

    render () {
        let {createdAt, favorited = false, favoritesCount = 0, author = {}} = this.props.article,
            {following = false, image = '', username = ''} = author;
        return (
            <div className="article-meta">
                <a href="#"><img src={image} /></a>
                <div className="info">
                    <a href="#" className="author">{username}</a>
                    <span className="date">{moment(createdAt).format('MMMM DD, YYYY')}</span>
                </div>
                <FollowButton following={following} username={username}/>
                &nbsp;&nbsp;
                <FavoriteButton favoritesCount={favoritesCount} favorited={favorited}/>
            </div>
        );
    }
}

export default ArticleMeta;