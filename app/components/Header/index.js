import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavItem, Nav, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from 'images/logo.png';
import StyledNavbar, { StyledLogo, StyledAppVersion } from './style';
import ExternalLink from '../ExternalLink';

const Header = (props) => (
  <StyledNavbar dark expand>
    <div className="navbar-brand">
      <Link to="/">
        <StyledLogo src={Logo} alt="Fastvue Syslog" />
      </Link>
      <StyledAppVersion><ExternalLink url="http://go.fastvue.co/?id=71" title="View Release Notes" text={props.appVersion} style={{color: "white"}}/></StyledAppVersion>
   </div>
 
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
