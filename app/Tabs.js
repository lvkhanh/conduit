import React, {PureComponent} from "react";
import Token from "./services/token";

class Tabs extends PureComponent {

    constructor (props) {
        super(props);

        this.token = Token.get();
        this.state = {
            items: props.items,
            activeTabId: props.activeTabId
        };
    }

    componentWillReceiveProps (props) {
        this.setState({...props});
    }

    handleTabClick (id, articleUrl, e) {
        e.preventDefault();

        let {className} = e.target;
        if (className.indexOf('active') > -1 || className.indexOf('disabled') > -1) {
            return;
        }
        this.props.handleTabClick(id, articleUrl);
    }


    render () {
        let {items, activeTabId} = this.state;

        return (
            <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    {
                        items.map(({id, label, isDisabled = false, articleUrl}) => {
                            return (
                                id ?
                                    <li className="nav-item" key={id || Math.random()}>
                                        <a id={id}
                                           href="#"
                                           className={`nav-link ${activeTabId === id ? 'active' : (isDisabled ? 'disabled' : '')}`}
                                           onClick={this.handleTabClick.bind(this, id, articleUrl)}>
                                                {label}
                                        </a>
                                    </li> :
                                    null
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Tabs;