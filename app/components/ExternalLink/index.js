import React from 'react';
import PropTypes from 'prop-types';

const ExternalLink = (props) => (
  <a href={props.url} title={props.title} target="_blank" style={props.style}>{props.text}</a>
);

ExternalLink.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object
};

export default ExternalLink; 