import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from 'containers/SideBar/Loadable';
import MainContent from 'containers/MainContent/Loadable';
import { Row, Container } from 'reactstrap';
import { fetchSourceList } from 'containers/SideBar/actions';
import { makeSelectActiveSource } from 'containers/SideBar/selectors';
import { fetchGlobalSettings } from 'containers/App/actions';

import reducer from './reducer';

class HomePage extends Component {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    intervalId: null
  };
  componentDidMount() {
    this.props.fetchSourceList();
    this.props.fetchGlobalSettings();
    const intervalId = setInterval(() => {
      this.props.fetchSourceList();
    }, 5000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  render() {
    return (
      <Fragment>
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
  fetchSourceList: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  fetchSourceList: () => dispatch(fetchSourceList()),
  fetchGlobalSettings: () => dispatch(fetchGlobalSettings())
});

const mapStateToProps = createStructuredSelector({
  activeSource: makeSelectActiveSource()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
  withConnect
)(HomePage);
export { mapDispatchToProps };
