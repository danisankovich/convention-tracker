import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../actions';

class Header extends Component {
  signout() {
    localStorage.removeItem('token');
    this.props.signoutUser();
  }
  render() {
    const { userInfo = {}, authenticated } = this.props;
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-logo-ct">CT</Link>

            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right navbar-links-ct">
              <li className="nav-item" key={0}>
                <Link className="nav-link" to="/conventions">Conventions</Link>
              </li>}
              {!authenticated && <li className="nav-item" key={1}>
                <Link className="nav-link" to="/signin">Sign In</Link>
              </li>}
              {!authenticated && <li className="nav-item" key={2}>
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>}
              {authenticated && <li className="dropdown" key={3}>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                   {userInfo.username}
                   <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="nav-link" to="/profile">Profile</Link></li>
                  <li><Link className="nav-link" to="/settings">Settings</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link className="nav-link" onClick={this.signout.bind(this)}>Sign Out</Link></li>
                </ul>
             </li>}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userInfo: state.auth.userInfo
  };
}
export default connect(mapStateToProps, actions)(Header);
