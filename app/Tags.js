import React, {Component, PureComponent} from 'react';
import Api, {ARTICLE_ENDPOINT} from './services/api';

class Tags extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick (e) {
        e.preventDefault();
        this.props.handleTagClick(e.target.id, ARTICLE_ENDPOINT, {
            tag: e.target.id
        });
    }

    componentDidMount() {
        Api
            .getTags()
            .then(tags => {
                this.setState({tags});
            });
    }

    render () {
        return (
            <div className="col-md-3">
                <div className="sidebar">
                    <p>Popular Tags</p>
                    <div className="tag-list">
                        {
                            this.state.tags.map(
                                (tag, index) => (
                                    <a id={tag} key={index} href="#" className="tag-pill tag-default" onClick={this.handleOnClick}>{tag}</a>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Tags;