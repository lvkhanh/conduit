import React, { PureComponent } from 'react';
import {withRouter, Link} from 'react-router-dom';
import Api, {ARTICLE_ENDPOINT} from './services/api';
import Storage from './services/storage';
import {FollowButton} from './Buttons';
import Tabs from './Tabs';
import Feeds from './Feeds';

class Profile extends PureComponent {

    constructor (props) {
        super(props);
console.log('Profile constructor');
        this.username = this.props.match.params.username;

        this.state = {
            profile: {},
            activeTabId: 'myArticles',
            feedInfo: {
                url: null,
                params: {}
            }
        };

        this.handleTabClick = this.handleTabClick.bind(this);
    }

    createTabs () {
        return [
            {
                id: 'myArticles',
                label: 'My Articles',
                articleUrl: `${ARTICLE_ENDPOINT}?author=${this.username}`
            },
            {
                id: 'favoriteArticles',
                label: 'Favorited Articles',
                articleUrl: `${ARTICLE_ENDPOINT}?favorited=${this.username}`
            }
        ];
    }

    componentWillReceiveProps (props) {
console.log('Profile componentWillReceiveProps', props);
        this.username = props.match.params.username;
        this.getProfile({
            activeTabId: 'myArticles',
            feedInfo: {
                url: `${ARTICLE_ENDPOINT}?author=${this.username}`,
                params: {}
            }
        });
    }

    componentDidMount () {
console.log('Profile componentDidMount', this.state);
        this.getProfile();
    }

    getProfile (extraState) {
        Api
            .getProfile(this.username)
            .then(profile => this.setState({
                profile,
                ...extraState,
                feedInfo: {
                    url: `${ARTICLE_ENDPOINT}?author=${this.username}`
                }
            }));
    }

    handleFollow (profile) {
        this.setState({profile});
    }

    handleTabClick (activeTabId, url, params) {
        this.setState({
            activeTabId,
            feedInfo: { params, url }
        });
    }

    render() {
console.log('Profile render', this.state);
        let {username = this.username, bio, image, following} = this.state.profile;
        return (
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">

                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <img src={image} className="user-img" />
                                <h4>{username}</h4>
                                <p>{bio}</p>
                                {
                                    Storage.getCurrentUser() === username ?
                                        <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
                                            <i className="ion-gear-a"></i>
                                            Edit Profile Settings
                                        </Link> :
                                        <FollowButton following={following} username={username} history={this.props.history} extraClassName="action-btn"/>
                                }
                            </div>

                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">

                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <Tabs activeTabId={this.state.activeTabId} handleTabClick={this.handleTabClick} items={this.createTabs()}/>
                            <Feeds info={this.state.feedInfo}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);
