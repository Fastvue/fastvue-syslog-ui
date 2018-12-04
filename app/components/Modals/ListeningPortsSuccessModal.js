import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';

const ListeningPortsSuccessModal = (props) => (
  <Modal isOpen toggle={props.onClose}>
    <ModalHeader toggle={props.onClose}>Ports Set!</ModalHeader>
    <ModalBody>
      Don&apos;t forget to allow them in Windows Firewall. They are:
      {props.ports}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={props.onClose}>
        OK
      </Button>
    </ModalFooter>
  </Modal>
);

ListeningPortsSuccessModal.propTypes = {
  onClose: PropTypes.func,
  ports: PropTypes.string
};

export default ListeningPortsSuccessModal;
