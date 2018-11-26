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
// eslint-disable-next-line react/prefer-stateless-function
class Login extends Component {
  state = { u: '', p: '' };

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
          <span className="h3"> Login</span>
          <p style={{ fontWeight: 'normal', marginTop: 10 }}>
            Please enter your credentials to log in to Fastvue Syslog Server.
          </p>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={() => this.props.onSubmit(this.state)}>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                value={this.state.u}
                onChange={(e) => this.setState({ u: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={this.state.p}
                onChange={(e) => this.setState({ p: e.target.value })}
              />
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <FormGroup>
            <Button
              color="success"
              onClick={() => this.props.onSubmit(this.state)}
            >
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
      </Col>
    );
  }
}

Login.propTypes = {
  globalSettings: PropTypes.object,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};

export default Login;
