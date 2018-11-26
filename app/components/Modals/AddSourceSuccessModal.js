import React from 'react'
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap'

const AddSourceSuccessModal = props => (
  <Modal isOpen toggle={props.onClose}>
    <ModalHeader toggle={props.onClose}>
      Added!
    </ModalHeader>
    <ModalBody>Syslog source added successfully.</ModalBody>
    <ModalFooter>
      <Button color='primary' onClick={props.onClose}>
        OK
      </Button>
    </ModalFooter>
  </Modal>
)

export default AddSourceSuccessModal
