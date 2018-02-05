import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Token from  './services/token';

import {getUser} from './actions/signIn';

class SignIn extends Component {

    constructor (props) {
        super(props);
        this.isFristRender = true;
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.signIn(this.emailInput.value, this.passwordInput.value);
    }

    componentWillReceiveProps (props) {
        if (!props.invalidInfo) {
            this.props.history.push('/');
        }
    }

    componentDidMount () {
        this.isFristRender = false;
    }

    render () {
        if (Token.get()) {
            return <Redirect to="/"/>
        }
        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign in</h1>
                            <p className="text-xs-center">
                                <Link to="/register">Need an account?</Link>
                            </p>
                            {
                                !this.isFristRender && this.props.invalidInfo &&
                                <ul className="error-messages">
                                    <li>email or password is invalid</li>
                                </ul>
                            }
                            <form>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Email" ref={input => this.emailInput = input}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="password" ref={input => this.passwordInput = input}
                                           placeholder="Password"/>
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" onClick={this.handleSubmit.bind(this)}>
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(
    connect(
        ({invalidInfo}) => ({invalidInfo}),
        (dispatch) => {
            return {
                signIn: (email, password) => {
                    dispatch(getUser(email, password));
                }
            };
        }
    )(SignIn)
);
