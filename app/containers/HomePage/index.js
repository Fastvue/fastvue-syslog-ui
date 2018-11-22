import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import SideBar from 'containers/SideBar/Loadable';
import MainContent from 'containers/MainContent/Loadable';
import { Row, Container } from 'reactstrap';
import { fetchSourceList } from 'containers/SideBar/actions';
import { makeSelectActiveSource } from 'containers/SideBar/selectors';
import { fetchGlobalSettings, fetchAppVersion } from './actions';
import { makeSelectAppVersion } from './selectors';

import reducer from './reducer';
import saga from './saga';
import './style.scss';

class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchSourceList();
    this.props.fetchGlobalSettings();
    this.props.fetchAppVersion();
    setInterval(() => {
      this.props.fetchSourceList();
    }, 5000);
  }
  render() {
    return (
      <Fragment>
        <Header appVersion={this.props.appVersion} />
        <Container fluid>
          <Row>
            <SideBar
              activeSourceId={
                this.props.match.params && this.props.match.params.id
              }
            />
            <MainContent
              sourceId={this.props.match.params && this.props.match.params.id}
              activeSource={this.props.activeSource}
              match={this.props.match}
              history={this.props.history}
            />
          </Row>
        </Container>
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  match: PropTypes.any,
  history: PropTypes.any,
  activeSource: PropTypes.any,
  login: PropTypes.func,
  fetchSourceList: PropTypes.func,
  globalSettings: PropTypes.object,
  fetchGlobalSettings: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  fetchSourceList: () => dispatch(fetchSourceList()),
  fetchGlobalSettings: () => dispatch(fetchGlobalSettings()),
  fetchAppVersion: () => dispatch(fetchAppVersion())
});

const mapStateToProps = createStructuredSelector({
  activeSource: makeSelectActiveSource(),
  appVersion: makeSelectAppVersion()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);
export { mapDispatchToProps };
