import React, {Component, PureComponent} from 'react';
import Api from './services/api';

class Tags extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
    }

    componentDidMount() {
console.log('Tags didMount');
        Api
            .getTags()
            .then(tags => {
                this.setState({tags});
            });
    }

    render () {
console.log('Tags render');
        return (
            <div className="col-md-3">
                <div className="sidebar">
                    <p>Popular Tags</p>
                    <div className="tag-list">
                        {
                            this.state.tags.map(
                                (tag, index) => (
                                    <a key={index} href="" className="tag-pill tag-default">{tag}</a>
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