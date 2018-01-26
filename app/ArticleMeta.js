import React, {PureComponent, Fragment} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import Storage from  './services/storage';
import {FavoriteButtonWithRouter, FollowButtonWithRouter, RemoveButtonWithRouter, EditButton} from './Buttons'

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
            {image = '', username = '', following = false} = author,
            groupButtonEle;

        if (Storage.getCurrentUser() === username) {
            groupButtonEle = (
                <Fragment>
                    <EditButton article={this.state.article}/>
                    &nbsp;&nbsp;
                    <RemoveButtonWithRouter article={this.state.article}/>
                </Fragment>
            );
        } else if (username !== '') {
            groupButtonEle = (
                <Fragment>
                    <FollowButtonWithRouter username={username} following={following} onClick={this.props.handleFollow}/>
                    &nbsp;&nbsp;
                    <FavoriteButtonWithRouter article={this.state.article} onClick={this.props.handleFavorite}/>
                </Fragment>
            );
        }

        return (
            <div className="article-meta">
                <Link to={`/profile/${username}`}><img src={image} /></Link>
                <div className="info">
                    <Link to={`/profile/${username}`} className="author">{username}</Link>
                    <span className="date">{moment(createdAt).format('MMMM DD, YYYY')}</span>
                </div>
                {this.state.article && groupButtonEle}
            </div>
        );
    }
}

export default ArticleMeta;