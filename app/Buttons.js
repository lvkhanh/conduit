import React, {PureComponent, Fragment} from "react";
import Handle from "./services/handle";
import Api from "./services/api";
import {Link, withRouter} from "react-router-dom";


class FollowButton extends PureComponent {
    constructor (props) {
        super(props);
        let {article: {author = {}}} = props;
        this.state = {
            following: author.following
        }
    }

    handleClick (e) {
        Handle.followUser(e, this.props.history.push, this.props.article, profile => {
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
        Handle.favorite(e, this.props.history.push, this.props.article, this.props.onClick);
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

class EditButton extends PureComponent {
    render () {
        return (
            <Link to={`/article/edit/${this.props.article.slug}`} className="btn btn-outline-secondary btn-sm">
                <i className="ion-edit"></i>
                Edit Article
            </Link>
        );
    }
}

class RemoveButton extends PureComponent {

    handleDelete() {
        Api
            .deleteArticle(this.props.article.slug)
            .then(() => {
                this.props.history.push('/');
            })
    }

    render () {
        return (
            <button className="btn btn-outline-danger btn-sm" onClick={this.handleDelete.bind(this)}>
                <i className="ion-trash-a"></i>
                Delete Article
            </button>
        );
    }
}

const FollowButtonWithRouter = withRouter(FollowButton);
const FavoriteButtonWithRouter = withRouter(FavoriteButton);
const RemoveButtonWithRouter = withRouter(RemoveButton);

export {
    FollowButtonWithRouter,
    FavoriteButtonWithRouter,
    EditButton,
    RemoveButtonWithRouter
};
