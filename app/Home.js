import React, { Component, PureComponent } from 'react';
import Feeds from './Feeds';
import Tags from './Tags';

class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isYourFeed: true
        };

        this.handleFeedClick = this.handleFeedClick.bind(this);

        console.log('Home constructor');
    }

    handleFeedClick (e) {
        let {id} = e.target,
            isYourFeed;
        if (id === 'yourFeed') {
            isYourFeed = true;
        } else {
            isYourFeed = false;
        }
        this.setState({isYourFeed});
    }

    render() {
        console.log('Home render');
        return (
            <div className="home-page">
                <div className="banner">
                    <div className="container">
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>
                </div>

                <div className="container page">
                    <div className="row">

                        <div className="col-md-9">
                            <div className="feed-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item">
                                        <a id="yourFeed" className={`nav-link ${this.state.isYourFeed ? 'active' : 'disabled' }`} href="#" onClick={this.handleFeedClick}>Your Feed</a>
                                    </li>
                                    <li className="nav-item">
                                        <a id="globalFeed" className={`nav-link ${this.state.isYourFeed ? 'disabled' : 'active' }`} href="#" onClick={this.handleFeedClick}>Global Feed</a>
                                    </li>
                                </ul>
                            </div>

                            <Feeds/>

                        </div>

                        <Tags/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
