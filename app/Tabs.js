import React, {PureComponent} from "react";
import Token from "./services/token";

const HIDDEN = {
    display: 'none'
};


class Tabs1 extends PureComponent {
    constructor (props) {
        super(props);

        this.token = Token.get();
        this.state = {
            items: props.items,
            activeItem: props.activeItem
        };

        this.handleTabClick = this.handleTabClick.bind(this);
    }

    componentWillReceiveProps (props) {
        this.setState({...props});
    }

    handleTabClick (e) {
        e.preventDefault();

        let {id, className} = e.target;
        if (className.indexOf('active') > -1 || className.indexOf('disabled') > -1) {
            return;
        }
        this.props.handleTabClick(id);
    }


    render () {
        let {items, activeItem} = this.state;

        return (
            <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    {
                        items.map(({id, label, isDisabled = false}) => {
                            return (
                                id ?
                                    <li className="nav-item" key={id || Math.random()}>

                                        <a id={id} className={`nav-link ${activeItem === id ? 'active' : (isDisabled ? 'disabled' : '')}`} href="#" onClick={this.handleTabClick}>{label}</a>
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

export default Tabs1;