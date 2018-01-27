import React, { Component, PureComponent } from 'react';
import Token from './services/token';
import Feeds from './Feeds';
import Tags from './Tags';
import Tabs from './Tabs';

export const YOUR_FEED_UNI_ID = 'yourFeedUniId';
export const GLOBAL_FEED_UNI_ID = 'globalFeedUniId';

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.token = Token.get();

        this.DEFAULT_ITEMS = [
            {
                id: YOUR_FEED_UNI_ID,
                label: 'Your Feed',
                isDisabled: !Boolean(this.token)
            },
            {
                id: GLOBAL_FEED_UNI_ID,
                label: 'Global Feed'
            }
        ];

        this.state = {
            activeFeed: this.token ? YOUR_FEED_UNI_ID : GLOBAL_FEED_UNI_ID,
            tabItems: this.DEFAULT_ITEMS
        };

        this.handleTagClick = this.handleTagClick.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);

    }

    handleTabClick (activeItem) {
        this.setState({
            activeFeed: activeItem,
            tabItems: this.DEFAULT_ITEMS
        });
    }

    handleTagClick (activeFeed) {
        this.setState({
            activeFeed,
            tabItems: [
                ...this.DEFAULT_ITEMS,
                {
                    id: activeFeed,
                    label: `# ${activeFeed}`
                }
            ]
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
                            <Tabs activeItem={this.state.activeFeed} handleTabClick={this.handleTabClick} items={this.state.tabItems}/>
                            <Feeds activeFeed={this.state.activeFeed}/>
                        </div>

                        <Tags handleTagClick={this.handleTagClick}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
