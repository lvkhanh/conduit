import React, {PureComponent} from "react";
import Token from "./services/token";

const HIDDEN = {
    display: 'none'
};

export const YOUR_FEED_UNI_ID = 'yourFeedUniId';
export const GLOBAL_FEED_UNI_ID = 'globalFeedUniId';

class Tabs extends PureComponent {
    constructor (props) {
        super(props);

        this.token = Token.get();

        this.handleFeedTabClick = this.handleFeedTabClick.bind(this);
    }

    handleFeedTabClick (e) {
        e.preventDefault();

        let id = e.target.id;
        if (id === YOUR_FEED_UNI_ID && !this.token) {
            return;
        }
        this.props.handleTabClick(id);
    }

    render () {
        let {activeFeed} = this.props,
            yourFeedClassName = activeFeed === YOUR_FEED_UNI_ID ? 'active' : (this.token ? '' : 'disabled'),
            globalFeedClassName = activeFeed === GLOBAL_FEED_UNI_ID ? 'active' : '',
            tagFeedId, tagFeedStyle, tagFeedClassName;

        if (activeFeed !== YOUR_FEED_UNI_ID && activeFeed !== GLOBAL_FEED_UNI_ID) {
            tagFeedId = activeFeed;
            tagFeedStyle = {};
            tagFeedClassName = 'active';
        } else {
            tagFeedId = 'tagFeed';
            tagFeedStyle = HIDDEN;
            tagFeedClassName = 'disabled';
        }

        return (
            <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                        <a id={YOUR_FEED_UNI_ID} className={`nav-link ${yourFeedClassName}`} href="#" onClick={this.handleFeedTabClick}>Your Feed</a>
                    </li>
                    <li className="nav-item">
                        <a id={GLOBAL_FEED_UNI_ID} className={`nav-link ${globalFeedClassName}`} href="#" onClick={this.handleFeedTabClick}>Global Feed</a>
                    </li>
                    <li className="nav-item" style={tagFeedStyle}>
                        <a id={tagFeedId} className={`nav-link ${tagFeedClassName}`} href="#" onClick={this.handleFeedTabClick}>{`# ${tagFeedId}`}</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Tabs;