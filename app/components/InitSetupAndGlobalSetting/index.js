import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Modal
} from 'reactstrap';

import { omit as _omit } from 'lodash';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import {
  fetchGlobalSettings,
  updateGlobalSettings,
  updatePorts,
  updateInitConfig
} from 'containers/App/actions';
import {
  makeSelectGlobalSettings,
  makeSelectUpdateGlobalSettingsLoading
} from 'containers/App/selectors';

class InitSetupAndGlobalSetting extends Component {
  state = {
    authEnabled: false,
    authUsername: '',
    autoDiscover: false,
    defaultArchivePath: '',
    defaultLogPath: '',
    ports: '',
    authPassword: ''
  };

  componentDidMount() {
    if (!this.props.initSetup) {
      this.props.fetchGlobalSettings();
    } else {
      this.setState({ ports: this.props.ports });
    }

    if (this.props.globalSettings) {
      this.setState({ ...this.props.globalSettings });
    }
  }
  componentDidUpdate(prevProps) {
    if (
      Object.keys(prevProps.globalSettings).length === 0 &&
      Object.keys(this.props.globalSettings).length > 0
    ) {
      this.setState({ ...this.props.globalSettings });
    }

    if (
      prevProps.updateGlobalSettingsLoading &&
      !this.props.updateGlobalSettingsLoading
    ) {
      this.props.history.push('/');
    }

    if (prevProps.ports !== this.props.ports) {
      this.setState({ ports: this.props.ports });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.initSetup) {
      this.props.updatePorts(this.state.ports);
      this.props.updateInitConfig();
    }
    this.props.updateGlobalSettings(_omit(this.state, ['ports']));
  };

  handleClose = () => {
    this.props.history.push('/');
  };

  authSection = () => (
    <Fragment>
      <FormGroup>
        <Label className="initSetupHeading">Authentication</Label>
        <p className="marginFix">
          <Input
            type="checkbox"
            checked={this.state.authEnabled}
            onChange={() =>
              this.setState({ authEnabled: !this.state.authEnabled })
            }
          />
          Require a password to access the syslog server interface.
        </p>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Username</Label>
        <Col sm={9}>
          <Input
            type="text"
            name="username"
            value={this.state.authUsername}
            onChange={(e) => this.setState({ authUsername: e.target.value })}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Password</Label>{' '}
        <Col sm={9}>
          <Input
            type="password"
            name="password"
            onChange={(e) => this.setState({ authPassword: e.target.value })}
          />
        </Col>
      </FormGroup>
    </Fragment>
  );

  storageSection = () => (
    <Fragment>
      {this.props.initSetup && (
        <Fragment>
          <Label className="initSetupHeading">Storage</Label>
          <p>
            {' '}
            Specify the default location to store new log files and archives of
            old log files.
          </p>
        </Fragment>
      )}
      {this.props.initSetup && (
        <Fragment>
          {' '}
          <FormGroup row>
            <Label sm={3}>Default Log Folder</Label>
            <Col sm={9}>
              <Input
                type="text"
                value={this.state.defaultLogPath}
                onChange={(e) =>
                  this.setState({ defaultLogPath: e.target.value })
                }
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Default Archive Folder</Label>
            <Col sm={9}>
              <Input
                type="text"
                value={this.state.defaultArchivePath}
                onChange={(e) =>
                  this.setState({ defaultArchivePath: e.target.value })
                }
              />
            </Col>
          </FormGroup>{' '}
        </Fragment>
      )}

      {!this.props.initSetup && (
        <Fragment>
          {' '}
          <FormGroup>
            <Label>Default Log Folder</Label>

            <Input
              type="text"
              value={this.state.defaultLogPath}
              onChange={(e) =>
                this.setState({ defaultLogPath: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Default Archive Folder</Label>

            <Input
              type="text"
              value={this.state.defaultArchivePath}
              onChange={(e) =>
                this.setState({ defaultArchivePath: e.target.value })
              }
            />
          </FormGroup>
          <div className="line" />
        </Fragment>
      )}
    </Fragment>
  );

  content = () => (
    <Fragment>
      <ModalHeader
        close={
          !this.props.initSetup ? (
            <FontAwesomeIcon icon="times" onClick={this.handleClose} />
          ) : null
        }
      >
        <p className="h4">
          {this.props.initSetup ? 'Initial Configuration' : 'Global Settings'}
        </p>

        {this.props.initSetup && (
          <p style={{ fontWeight: 'normal', fontSize: 14 }}>
            Welcome to Fastvue Syslog Server! This page will assist you in
            performing initial configuration of your syslog server.
          </p>
        )}
      </ModalHeader>
      <Form onSubmit={this.handleSubmit}>
        {this.props.globalSettings && (
          <ModalBody>
            {this.props.initSetup && (
              <Fragment>
                {' '}
                <FormGroup>
                  <Label className="initSetupHeading">Listening ports</Label>
                  <p>
                    Listen for syslog traffic on the following ports. (Separate
                    multiple ports with a comma)
                  </p>
                  <Input
                    type="text"
                    value={this.state.ports}
                    onChange={(e) => this.setState({ ports: e.target.value })}
                  />
                </FormGroup>
                <div className="line" />
              </Fragment>
            )}
            {!this.props.initSetup && this.storageSection()}

            <FormGroup>
              <Label className="initSetupHeading">
                Auto-Discover Syslog Sources
              </Label>
              <p className="marginFix">
                {' '}
                <Input
                  type="checkbox"
                  checked={this.state.autoDiscover}
                  onChange={() =>
                    this.setState({
                      autoDiscover: !this.state.autoDiscover
                    })
                  }
                />
                Automatically start logging syslog traffic when it arrives from
                new hosts.
              </p>
            </FormGroup>

            <div className="line" />
            {this.authSection()}

            {this.props.initSetup && (
              <Fragment>
                <div className="line" />
                {this.storageSection()}
              </Fragment>
            )}
          </ModalBody>
        )}
        <ModalFooter>
          <FormGroup>
            {!this.props.initSetup && (
              <Button
                className="halfButton"
                color="danger"
                onClick={this.handleClose}
              >
                Cancel
              </Button>
            )}{' '}
            <Button
              className="halfButton"
              color="success"
              type="submit"
              disabled={this.props.loading}
            >
              {this.props.loading ? (
                <Fragment>
                  <FontAwesomeIcon spin icon="circle-notch" /> Saving
                </Fragment>
              ) : (
                <Fragment>
                  <FontAwesomeIcon icon="check" /> Save{' '}
                  {this.props.initSetup ? 'Configuration' : ''}
                </Fragment>
              )}
            </Button>
          </FormGroup>
        </ModalFooter>
      </Form>
    </Fragment>
  );

  render() {
    return (
      <Col
        lg={this.props.initSetup ? '10' : '6'}
        md="12"
        xl={this.props.initSetup ? '6' : '5'}
        style={{
          margin: '10px auto',
          backgroundColor: 'white',
          border: '1px solid #E9ECEF'
        }}
      >
        {!this.props.initSetup ? (
          <Modal isOpen className="drawer" onClose={this.handleClose}>
            {this.content()}
          </Modal>
        ) : (
          this.content()
        )}
      </Col>
    );
  }
}

InitSetupAndGlobalSetting.propTypes = {
  globalSettings: PropTypes.object,
  loading: PropTypes.bool,
  initSetup: PropTypes.bool,
  history: PropTypes.any,
  ports: PropTypes.string,
  updateGlobalSettingsLoading: PropTypes.bool,
  fetchGlobalSettings: PropTypes.func,
  updateGlobalSettings: PropTypes.func,
  updatePorts: PropTypes.func,
  updateInitConfig: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  fetchGlobalSettings: () => dispatch(fetchGlobalSettings()),
  updateGlobalSettings: (settings) => dispatch(updateGlobalSettings(settings)),
  updatePorts: (ports) => dispatch(updatePorts(ports)),
  updateInitConfig: () => dispatch(updateInitConfig())
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
)(InitSetupAndGlobalSetting);
