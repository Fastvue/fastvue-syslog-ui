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

class Login extends Component {
  state = { username: '', password: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

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
        <ModalHeader>
          <span className="h3"> Login</span>
          <p style={{ fontWeight: 'normal', marginTop: 10 }}>
            Please enter your credentials to log in to Fastvue Syslog Server.
          </p>
        </ModalHeader>
        <Form onSubmit={this.handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                autoComplete="username"
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <FormGroup>
              <Button color="success" type="submit">
                {this.props.loading ? (
                  <Fragment>
                    <FontAwesomeIcon spin icon="circle-notch" /> Logging
                  </Fragment>
                ) : (
                  'Login'
                )}
              </Button>
            </FormGroup>
          </ModalFooter>
        </Form>
      </Col>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default Login;
