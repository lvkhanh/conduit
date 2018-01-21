import React, { Component, PureComponent } from 'react';
import Token from './services/token';
import Feeds from './Feeds';
import Tags from './Tags';
import Tabs, {YOUR_FEED_UNI_ID, GLOBAL_FEED_UNI_ID}  from './Tabs';

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.token = Token.get();
        this.state = {
            activeFeed: this.token ? YOUR_FEED_UNI_ID : GLOBAL_FEED_UNI_ID
        };

        this.handleTagClick = this.handleTagClick.bind(this);
    }

    handleTagClick (activeFeed) {
        this.setState({
            activeFeed
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
                            <Tabs activeFeed={this.state.activeFeed} handleTabClick={this.handleTagClick}/>
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
