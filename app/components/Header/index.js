import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Drawer from 'components/Drawer';
import { Navbar, NavItem, Nav, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from 'images/logo.png';
import './style.scss';
// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  render() {
    return (
      <Navbar className="header" dark expand>
        <Link to="/" className="navbar-brand">
          <img className="logo" src={Logo} alt="Logo" />
          <div className="appVersion"> {this.props.appVersion}</div>
        </Link>

        <Nav navbar className="ml-auto">
          <NavItem>
            <NavLink>
              <FontAwesomeIcon icon="sign-out-alt" />
            </NavLink>
          </NavItem>
          <NavItem>
            <Link to="/settings" className="nav-link">
              <FontAwesomeIcon icon="cog" />
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

Header.propTypes = {
  appVersion: PropTypes.string
};

export default Header;
