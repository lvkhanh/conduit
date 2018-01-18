import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

class SignIn extends Component {
    constructor (props) {
        super(props);

        this.state = {
            invalidInfo: false/*,
            loginSuccess: false*/
        }
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.api
            .login({
                email: this.emailInput.value,
                password: this.passwordInput.value
            })
            .then(user => {
                this.props.handleSignIn(user);
                /*this.setState({
                    loginSuccess: true
                });*/
                this.props.history.push('/home');
            })
            .catch(e => {
                this.setState({invalidInfo: true});
            });
    }

    render () {
        /*if (this.state.loginSuccess) {
            return <Redirect to="/home"/>
        }*/

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
                                this.state.invalidInfo &&
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

export default SignIn;
