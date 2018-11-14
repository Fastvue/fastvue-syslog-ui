import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import SideBar from 'components/SideBar';
import MainContent from 'components/MainContent';
import { Row } from 'reactstrap';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Fragment>
        <Header appVersion="2.0.0.3" />
        <div className="main-wrapper">
          <SideBar />
          <MainContent />
        </div>
      </Fragment>
    );
  }
}

HomePage.propTypes = {};
