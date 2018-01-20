import React, { Component } from 'react';
import Token from './services/token';
import {redirectIfNotAuthenticated} from './services/auth';

class Settings extends Component {

    handleSignOut () {
        Token.remove();
        this.props.removeUser();
        this.props.history.push('/home');
    }

    componentWillMount () {
        redirectIfNotAuthenticated(this.props.history.push, '/login');
    }

    render() {
        const {user} = this.props;
        if (!user) return null;
        return  (
            <div className="settings-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Your Settings</h1>

                            <form>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control" type="text" placeholder="URL of profile picture" value={user.image}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="text" placeholder="Your Name" value={user.username}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea className="form-control form-control-lg" rows="8" placeholder="Short bio about you" value={user.bio}></textarea>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="text" placeholder="Email" value={user.email}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="password" placeholder="Password" value={user.password}/>
                                    </fieldset>
                                    <button className="btn btn-lg btn-primary pull-xs-right">
                                        Update Settings
                                    </button>
                                </fieldset>
                            </form>
                            <hr/>
                            <button className="btn btn-outline-danger" onClick={this.handleSignOut.bind(this)}>
                                Or click here to logout.
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;
