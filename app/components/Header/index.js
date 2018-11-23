import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Drawer from 'components/Drawer';
import { Navbar, NavItem, Nav, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from 'images/logo.png';
import './style.scss';
// eslint-disable-next-line react/prefer-stateless-function
const Header = (props) => (
  <Navbar className="header" dark expand>
    <Link to="/" className="navbar-brand">
      <img className="logo" src={Logo} alt="Logo" />
      <div className="appVersion"> {props.appVersion}</div>
    </Link>

    <Nav navbar className="ml-auto">
      {props.toShowLogout && (
        <NavItem onClick={props.onLogout}>
          <NavLink>
            <FontAwesomeIcon icon="sign-out-alt" />
          </NavLink>
        </NavItem>
      )}
      {props.toShowSettings && (
        <NavItem>
          <Link to="/settings" className="nav-link">
            <FontAwesomeIcon icon="cog" />
          </Link>
        </NavItem>
      )}
    </Nav>
  </Navbar>
);

Header.propTypes = {
  appVersion: PropTypes.string,
  toShowLogout: PropTypes.bool,
  toShowSettings: PropTypes.bool,
  onLogout: PropTypes.func
};

export default Header;
