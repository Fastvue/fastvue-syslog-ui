import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';

const AddSourceSuccessModal = (props) => (
  <Modal isOpen toggle={props.onClose}>
    <ModalHeader toggle={props.onClose}>Added!</ModalHeader>
    <ModalBody>Syslog source added successfully.</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={props.onClose}>
        OK
      </Button>
    </ModalFooter>
  </Modal>
);
AddSourceSuccessModal.propTypes = {
  onClose: PropTypes.func
};
export default AddSourceSuccessModal;
