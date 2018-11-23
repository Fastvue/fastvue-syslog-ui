import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Col, Row } from 'reactstrap';
import { createStructuredSelector } from 'reselect';

import Drawer from 'components/Drawer';
import Header from 'components/Header';

import {
  fetchGlobalSettings,
  updateGlobalSettings
} from 'containers/App/actions';
import {
  makeSelectGlobalSettings,
  makeSelectUpdateGlobalSettingsLoading
} from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';

import './style.scss';

class GlobalSettings extends Component {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchGlobalSettings();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.updateGlobalSettingsLoading &&
      !this.props.updateGlobalSettingsLoading
    ) {
      this.props.history.goBack();
    }
  }

  render() {
    return (
      <Fragment>
        <Col md={12} lg={12} xl={12}>
          <Row>
            <Drawer
              globalSettings={this.props.globalSettings}
              onClose={() => {
                this.props.history.goBack();
              }}
              onSubmit={(settings) => this.props.updateGlobalSettings(settings)}
              loading={this.props.updateGlobalSettingsLoading}
            />
          </Row>
        </Col>
      </Fragment>
    );
  }
}

GlobalSettings.propTypes = {
  globalSettings: PropTypes.object,
  updateGlobalSettingsLoading: PropTypes.bool,
  fetchGlobalSettings: PropTypes.func,
  updateGlobalSettings: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  fetchGlobalSettings: () => dispatch(fetchGlobalSettings()),
  updateGlobalSettings: (settings) => dispatch(updateGlobalSettings(settings))
});

const mapStateToProps = createStructuredSelector({
  globalSettings: makeSelectGlobalSettings(),
  updateGlobalSettingsLoading: makeSelectUpdateGlobalSettingsLoading()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withRouter
)(GlobalSettings);
