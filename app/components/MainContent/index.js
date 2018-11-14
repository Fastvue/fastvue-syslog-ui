import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import './style.scss';

const MainContent = (props) => (
  <Col className="main-content" xs="12" md="8" lg="9" >
  Main content
  </Col>
);

MainContent.propTypes = {};

export default MainContent;
