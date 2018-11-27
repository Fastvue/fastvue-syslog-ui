import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from 'containers/SideBar/Loadable';
import MainContent from 'containers/MainContent/Loadable';
import { Row, Container } from 'reactstrap';
import { fetchSourceList } from 'containers/SideBar/actions';
import { makeSelectActiveSource } from 'containers/SideBar/selectors';
import { fetchGlobalSettings } from 'containers/App/actions';
import { makeSelectGlobalSettings } from 'containers/App/selectors';

import InitSetupAndGlobalSetting from 'components/InitSetupAndGlobalSetting';

class HomePage extends Component {
  state = {
    intervalId: null
  };
  componentDidMount() {
    console.log(this.props.match);
    this.props.fetchSourceList();
    this.props.fetchGlobalSettings();
    const intervalId = setInterval(() => {
      this.props.fetchSourceList();
    }, 5000);
    this.setState({ intervalId });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.path !== this.props.match.path &&
      this.props.match.path === '/settings'
    ) {
      this.props.fetchGlobalSettings();
    }
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
            {this.props.match.path === '/settings' && (
              <InitSetupAndGlobalSetting
                globalSettings={this.props.globalSettings}
              />
            )}
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
  fetchSourceList: PropTypes.func,
  globalSettings: PropTypes.any
};

const mapDispatchToProps = (dispatch) => ({
  fetchSourceList: () => dispatch(fetchSourceList()),
  fetchGlobalSettings: () => dispatch(fetchGlobalSettings())
});

const mapStateToProps = createStructuredSelector({
  activeSource: makeSelectActiveSource(),
  globalSettings: makeSelectGlobalSettings()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(HomePage);
export { mapDispatchToProps };
