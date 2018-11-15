import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import './style.scss';

const MainContent = (props) => (
  <Col
    className="main-content"
    xs="12"
    md={{ size: '8', offset: '4' }}
    lg={{ size: '9', offset: '3' }}
  >
    Main content
  </Col>
);

MainContent.propTypes = {};

export default MainContent;
