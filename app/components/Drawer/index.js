import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Col
} from 'reactstrap';
import './style.scss';

const Drawer = (props) => (
  <Col lg="6" md="12" xl="5">
    <Modal isOpen toggle={() => {}} className="right">
      <ModalHeader close={<FontAwesomeIcon icon="times" />}>
       Global Settings
      </ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => {}}>
          Do Something
        </Button>{' '}
        <Button color="secondary" onClick={() => {}}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  </Col>
);

Drawer.propTypes = {};

export default Drawer;
