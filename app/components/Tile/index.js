import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToggleButton from 'components/ToggleButton';
import StyledTile from './style';

const Tile = (props) => (
  <StyledTile onClick={props.onClick} xs="6" md="6" lg="6">
    <Col className="iconBox">
      {props.variant === 'autoDiscover' && (
        <div className="toggle">
          <ToggleButton
            isButtonOn={props.isAutoDiscoverOn}
            onClick={props.onClick}
          />
        </div>
      )}
      {props.variant === 'listeningPort' && (
        <FontAwesomeIcon icon="headphones" />
      )}
      {props.variant === 'addSource' && <FontAwesomeIcon icon="plus" />}
    </Col>
    <span className="tileLabel">{props.label}</span>
  </StyledTile>
);

Tile.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isAutoDiscoverOn: PropTypes.bool
};

export default Tile;
