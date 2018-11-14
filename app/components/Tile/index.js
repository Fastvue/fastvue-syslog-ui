import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavItem,
  Nav,
  NavLink,
  Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

const Tile = (props) => (
  <Col className="tile" onClick={(e) => props.onClick(e)} xs="6" md="6" lg="6">
    <div className="iconBox">
      {props.variant === 'autoDiscover' && (
        <div
          className={`switch ${props.isAutoDiscoverOn ? 'switch-on' : null}`}
          id="globalAutoDiscover"
          data-on={props.isAutoDiscoverOn ? 'true' : 'false'}
        >
          <div className="switch-text-off">OFF</div>
          <div className="glow-comp" />
          <div className="switch-button" />
          <div className="switch-text-on">ON</div>
        </div>
      )}
      {props.variant === 'listeningPort' && (
        <FontAwesomeIcon icon="headphones" />
      )}
      {props.variant === 'addSource' && <FontAwesomeIcon icon="plus" />}
    </div>
    <span className="tileLabel">{props.label}</span>
  </Col>
);

Tile.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isAutoDiscoverOn: PropTypes.bool
};

export default Tile;
