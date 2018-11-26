import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';

const DeleteSourceModal = (props) => (
  <Modal isOpen toggle={props.onClose}>
    <ModalHeader toggle={props.onClose}>Are you sure?</ModalHeader>
    <ModalBody>Delete syslog source {props.displayName}?</ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={props.onClose}>
        Cancel
      </Button>{' '}
      <Button color="danger" onClick={props.onSubmit}>
        Yes, delete it !
      </Button>
    </ModalFooter>
  </Modal>
);

export default DeleteSourceModal;
