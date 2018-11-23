import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import './style.scss';
// eslint-disable-next-line react/prefer-stateless-function
class Drawer extends Component {
  state = { ...this.props.globalSettings };

  componentDidUpdate(prevProps) {
    if (
      Object.keys(prevProps.globalSettings).length === 0 &&
      Object.keys(this.props.globalSettings).length > 0
    ) {
      this.setState({ ...this.props.globalSettings });
    }
  }
  render() {
    return (
      <Col
        md="12"
        lg="10"
        xl="6"
        style={{
          margin: '10px auto',
          backgroundColor: 'white',
          border: '1px solid #E9ECEF',
          padding: 20
        }}
      >
        <span className="h4"> Initial Configuration</span>
        <p style={{ fontWeight: 'normal', fontSize: 14 }}>
          Welcome to Fastvue Syslog Server! This page will assist you in
          performing initial configuration of your syslog server.
        </p>

        {this.props.globalSettings && (
          <Form onSubmit={() => this.props.onSubmit(this.state)}>
            <FormGroup>
              <Label for="exampleEmail">Default Log Folder</Label>
              <Input
                type="text"
                value={this.state.defaultLogPath}
                onChange={(e) =>
                  this.setState({ defaultLogPath: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Default Archive Folder</Label>
              <Input
                type="text"
                value={this.state.defaultArchivePath}
                onChange={(e) =>
                  this.setState({ defaultArchivePath: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Auto-Discover Syslog Sources</Label>
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
            <FormGroup>
              <Label>Authentication</Label>
              <p className="marginFix">
                <Input
                  type="checkbox"
                  checked={this.state.authEnabled}
                  onClick={() =>
                    this.setState({ authEnabled: !this.state.authEnabled })
                  }
                />
                Require a password to access the syslog server interface.
              </p>
            </FormGroup>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                value={this.state.authUsername}
                onChange={(e) =>
                  this.setState({ authUsername: e.target.value })
                }
                autoComplete="username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                onChange={(e) =>
                  this.setState({ authPassword: e.target.value })
                }
                autoComplete="current-password"
              />
            </FormGroup>
          </Form>
        )}
        <ModalFooter>
          <FormGroup>
            <Button
              className="halfButton"
              color="success"
              type="submit"
              onClick={() => this.props.onSubmit(this.state)}
              disabled={this.props.loading}
            >
              {this.props.loading ? (
                <Fragment>
                  <FontAwesomeIcon spin icon="circle-notch" /> Saving
                </Fragment>
              ) : (
                <span>
                  {' '}
                  <FontAwesomeIcon icon="check" /> Save Configuration
                </span>
              )}
            </Button>
          </FormGroup>
        </ModalFooter>
      </Col>
    );
  }
}

Drawer.propTypes = {
  globalSettings: PropTypes.object,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};

export default Drawer;
