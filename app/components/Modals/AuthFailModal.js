import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';

const AuthFailModal = (props) => (
  <Modal isOpen toggle={props.onClose}>
    <ModalHeader toggle={props.onClose}>Error!</ModalHeader>
    <ModalBody>Invalid username or password.</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={props.onClose}>
        OK
      </Button>
    </ModalFooter>
  </Modal>
);

export default AuthFailModal;
