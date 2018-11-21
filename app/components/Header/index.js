import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavItem,
  Nav,
  NavLink
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from 'images/logo.png';
import './style.scss';

const Header = (props) => (
  <Navbar className="header" dark color="dark" expand>
    <Link to="/">
      <img className="logo" src={Logo} alt="Logo" />
      <span className="appVersion"> {props.appVersion}</span>
    </Link>

    <Nav navbar className="ml-auto">
      <NavItem>
        <NavLink>
          <FontAwesomeIcon icon="sign-out-alt" />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink>
          <FontAwesomeIcon icon="cog" />
        </NavLink>
      </NavItem>
    </Nav>
  </Navbar>
);

Header.propTypes = {
  appVersion: PropTypes.string.isRequired
};

export default Header;
