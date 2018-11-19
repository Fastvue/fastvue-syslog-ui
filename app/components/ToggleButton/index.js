import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ToggleButton = (props) => (
  <div
    className="toggle-button"
    role="button"
    onClick={(e) => props.onClick(props.isButtonOn)}
  >
    <div
      className={`switch ${props.isButtonOn ? 'switch-on' : null}`}
      id="globalAutoDiscover"
      data-on={props.isButtonOn ? 'true' : 'false'}
    >
      <div className="switch-text-off">OFF</div>
      <div className="glow-comp" />
      <div className="switch-button" />
      <div className="switch-text-on">ON</div>
    </div>
  </div>
);

ToggleButton.propTypes = {
  isButtonOn: PropTypes.bool,
  onClick: PropTypes.func
};

export default ToggleButton;
