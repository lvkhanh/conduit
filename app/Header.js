import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({user, loading}) => {

    let infoEle, signInEle, signUpEle;

    if (user) {
        infoEle = (
            <li className="nav-item">
                <Link to="/settings" className="nav-link">
                    {user.username}
                </Link>
            </li>
        );
    } else {
        if (loading) {
            signInEle = (
                <li className="nav-item">
                    <a className="nav-link" href="#">Loading...</a>
                </li>
            );
        } else {
            signInEle = (
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign in</Link>
                </li>
            );
            signUpEle = (
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign up</Link>
                </li>
            )
        }

    }

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="index.html">conduit</a>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/editor" className="nav-link">
                            <i className="ion-compose"></i>&nbsp;New Post
                        </Link>
                    </li>
                    {infoEle}
                    {signInEle}
                    {signUpEle}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
