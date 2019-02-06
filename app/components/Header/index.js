import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavItem, Nav, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from 'images/logo.png';
import StyledNavbar, { StyledLogo, StyledAppVersion } from './style';

const Header = (props) => (
  <StyledNavbar dark expand>
    <Link to="/" className="navbar-brand">
      <StyledLogo src={Logo} alt="Fastvue Syslog" />
      <StyledAppVersion> {props.appVersion}</StyledAppVersion>
    </Link>

    <Nav navbar className="ml-auto">
      {props.toShowLogout && (
        <NavItem onClick={props.onLogout}>
          <NavLink>
            <FontAwesomeIcon icon="sign-out-alt" title="Log Out" />
          </NavLink>
        </NavItem>
      )}
      {props.toShowSettings && (
        <NavItem>
          <Link to="/settings" className="nav-link">
            <FontAwesomeIcon icon="cog" title="Global Settings" />
          </Link>
        </NavItem>
      )}
    </Nav>
  </StyledNavbar>
);

Header.propTypes = {
  appVersion: PropTypes.string,
  toShowLogout: PropTypes.bool,
  toShowSettings: PropTypes.bool,
  onLogout: PropTypes.func
};

export default Header;
