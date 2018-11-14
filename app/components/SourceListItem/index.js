import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

const SourceListItem = (props) => (
  <Col
    className="sourceListItem"
    onClick={(e) => props.onClick(e)}
    xs="6"
    md="6"
    lg="6"
  >
    {props.sourceHost}
  </Col>
);

SourceListItem.propTypes = {
  sourceHost: PropTypes.string
};

export default SourceListItem;
