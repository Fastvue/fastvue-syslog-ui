import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'reactstrap';
import './style.scss';

const Header = (props) => <Navbar className="header" dark fixed color="dark" />;

Header.propTypes = {};

export default Header;
