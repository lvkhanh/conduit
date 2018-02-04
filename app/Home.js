import React, { Component, PureComponent } from 'react';
import Token from './services/token';
import {ARTICLE_ENDPOINT, ARTICLE_FEED_ENDPOINT} from './services/api';
import Feeds from './Feeds';
import Tags from './Tags';
import Tabs from './Tabs';



const YOUR_FEED_UNI_ID      = 'yourFeedUniId';
const GLOBAL_FEED_UNI_ID    = 'globalFeedUniId';

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.token = Token.get();

        this.DEFAULT_TABS = [
            {
                id: YOUR_FEED_UNI_ID,
                label: 'Your Feed',
                isDisabled: !Boolean(this.token),
                articleUrl: ARTICLE_FEED_ENDPOINT
            },
            {
                id: GLOBAL_FEED_UNI_ID,
                label: 'Global Feed',
                articleUrl: ARTICLE_ENDPOINT
            }
        ];

        this.state = {
            tabItems: this.DEFAULT_TABS,
            activeTabId: this.token ? YOUR_FEED_UNI_ID : GLOBAL_FEED_UNI_ID,
            feedInfo: {
                params: {},
                url: this.token ? ARTICLE_FEED_ENDPOINT : ARTICLE_ENDPOINT
            }
        };

        this.handleTagClick = this.handleTagClick.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick (activeTabId, url, params) {
        this.setState({
            activeTabId,
            tabItems: this.DEFAULT_TABS,
            feedInfo: { params, url }
        });
    }

    handleTagClick (activeTabId, url, params) {
        this.setState({
            activeTabId,
            tabItems: [
                ...this.DEFAULT_TABS,
                {
                    id: activeTabId,
                    label: `# ${activeTabId}`
                }
            ],
            feedInfo: { params, url }
        });
    }

    render() {
        return (
            <div className="home-page">
                {
                    !this.token &&
                    <div className="banner">
                        <div className="container">
                            <h1 className="logo-font">conduit</h1>
                            <p>A place to share your knowledge.</p>
                        </div>
                    </div>
                }

                <div className="container page">
                    <div className="row">

                        <div className="col-md-9">
                            <Tabs activeTabId={this.state.activeTabId} handleTabClick={this.handleTabClick} items={this.state.tabItems}/>
                            <Feeds info={this.state.feedInfo}/>
                        </div>

                        <Tags handleTagClick={this.handleTagClick}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
