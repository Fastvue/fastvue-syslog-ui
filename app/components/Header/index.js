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
  state = {
    isGlobalSettingDrawerOpen: false
  };
  render() {
    return (
      <Navbar className="header" dark color="dark" expand>
        <Link to="/">
          <img className="logo" src={Logo} alt="Logo" />
          <span className="appVersion"> {this.props.appVersion}</span>
        </Link>

        <Nav navbar className="ml-auto">
          <NavItem>
            <NavLink>
              <FontAwesomeIcon icon="sign-out-alt" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <FontAwesomeIcon
                icon="cog"
                onClick={() =>
                  this.setState({
                    isGlobalSettingDrawerOpen: !this.state
                      .isGlobalSettingDrawerOpen
                  })
                }
              />
              {this.state.isGlobalSettingDrawerOpen && <Drawer />}
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

Header.propTypes = {
  appVersion: PropTypes.string.isRequired
};

export default Header;
