import React from 'react'
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap'

const DeleteSourceSuccessModal = props => (
  <Modal isOpen toggle={props.onClose}>
    <ModalHeader toggle={props.onClose}>
      Deleted!
    </ModalHeader>
    <ModalBody>
      Syslog source {props.displayName} deleted.
    </ModalBody>
    <ModalFooter>
      <Button color='primary' onClick={props.onClose}>
        OK
      </Button>
    </ModalFooter>
  </Modal>
)

export default DeleteSourceSuccessModal