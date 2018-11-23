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
      console.log('timesss');
      this.setState({ ...this.props.globalSettings });
    }
  }
  render() {
    return (
      <Col
        lg="6"
        md="12"
        xl="5"
        style={{
          margin: '10px auto',
          backgroundColor: 'white',
          border: '1px solid #E9ECEF'
        }}
      >
        <ModalHeader
          close={<FontAwesomeIcon icon="times" onClick={this.props.onClose} />}
        >
          Global Settings
        </ModalHeader>
        {this.props.globalSettings && (
          <ModalBody>
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
                  Automatically start logging syslog traffic when it arrives
                  from new hosts.
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
          </ModalBody>
        )}
        <ModalFooter>
          <FormGroup>
            <Button
              className="halfButton"
              color="danger"
              onClick={this.props.onClose}
            >
              Cancel
            </Button>{' '}
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
                'Save'
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
