import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Header = ({user, loading, location: {pathname}}) => {

    let newArticleEle, settingEle, infoEle, signInEle, signUpEle;

    if (user) {
        newArticleEle = (
            <li className="nav-item">
                <Link to="/article/new" className={`nav-link ${pathname.indexOf('article/new') > -1 ? 'active' : ''}`}>
                    <i className="ion-compose"></i>&nbsp;New Article
                </Link>
            </li>
        );
        settingEle = (
            <li className="nav-item">
                <Link to="/settings" className={`nav-link ${pathname.indexOf('settings') > -1 ? 'active' : ''}`}>
                    Settings
                </Link>
            </li>
        );
        infoEle = (
            <li className="nav-item">
                <Link to={`/profile/${user.username}`} className={`nav-link ${pathname.indexOf('profile') > -1 ? 'active' : ''}`}>
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
                    <Link to="/login" className={`nav-link ${pathname.indexOf('login') > -1 ? 'active' : ''}`}>Sign in</Link>
                </li>
            );
            signUpEle = (
                <li className="nav-item">
                    <Link to="/register" className={`nav-link ${pathname.indexOf('register') > -1 ? 'active' : ''}`}>Sign up</Link>
                </li>
            )
        }

    }

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link to="/" className="navbar-brand">conduit</Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
                    </li>
                    {newArticleEle}
                    {settingEle}
                    {infoEle}
                    {signInEle}
                    {signUpEle}
                </ul>
            </div>
        </nav>
    );
};

export default withRouter(Header);
