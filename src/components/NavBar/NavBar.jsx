import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './NavBar.css';


class NavBar extends Component {
  render() {
    return (
      <container>
        <div className="nav-bar">
          <div className="nav home"><Link to="/" onlyActiveOnIndex={true}>Home</Link></div>
          <div className="nav login"><Link to="/login">Login</Link></div>
          <div className="nav logout" onClick={this.props.logOut}><Link to="/">Logout</Link></div>
          <div className="nav search"><Link to="/search">Search</Link></div>
        </div>
      </container>
    )
  }
}

export default NavBar;
