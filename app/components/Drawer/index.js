import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Modal,
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

const Drawer = (props) => (
  <Col lg="6" md="12" xl="5">
    <Modal isOpen toggle={props.onClose} className="right">
      <ModalHeader
        close={<FontAwesomeIcon icon="times" onClick={props.onClose} />}
      >
        Global Settings
      </ModalHeader>
      {props.globalSettings && (
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Default Log Folder</Label>
              <Input
                type="text"
                value={props.globalSettings.defaultLogPath}
                onChange={(e) => {}}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Default Archive Folder</Label>
              <Input
                type="text"
                value={props.globalSettings.defaultArchivePath}
                onChange={(e) => {}}
              />
            </FormGroup>

            <FormGroup>
              <Label>Auto-Discover Syslog Sources</Label>
              <p className="marginFix">
                {' '}
                <Input
                  type="checkbox"
                  checked={props.globalSettings.autoDiscover}
                  onChange={(e) => {}}
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
                  checked={props.globalSettings.authEnabled}
                  onChange={(e) => {}}
                />
                Require a password to access the syslog server interface.
              </p>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Username</Label>
              <Input
                type="text"
                value={props.globalSettings.authUsername}
                onChange={(e) => {}}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                onChange={(e) => {}}
                autocomplete="current-password"
              />
            </FormGroup>
          </Form>
        </ModalBody>
      )}
      <ModalFooter>
        <FormGroup>
          <Button className="halfButton" color="danger" onClick={props.onClose}>
            Cancel
          </Button>{' '}
          <Button
            onClick={(e) => this.props.onSubmit()}
            className="halfButton"
            color="success"
            type="submit"
          >
            {props.loading ? (
              <Fragment>
                <FontAwesomeIcon spin icon="circle-notch" /> Saving
              </Fragment>
            ) : (
              'Save'
            )}
          </Button>
        </FormGroup>
      </ModalFooter>
    </Modal>
  </Col>
);

Drawer.propTypes = {
  onClose: PropTypes.func,
  globalSettings: PropTypes.object
};

export default Drawer;
