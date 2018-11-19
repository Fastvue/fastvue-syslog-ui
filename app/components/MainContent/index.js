import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import './style.scss';

const MainContent = (props) => (
  <Col
    className="main-content"
    md={12}
    lg={{ size: 8, offset: 4 }}
    xl={{ size: 9, offset: 3 }}
  >
    <Row>Main Content</Row>
  </Col>
);

MainContent.propTypes = {};

export default MainContent;
