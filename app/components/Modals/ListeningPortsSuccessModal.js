import React from 'react'
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap'

const ListeningPortsSuccessModal = props => (
  <Modal isOpen toggle={props.onClose}>
    <ModalHeader toggle={props.onClose}>
      Ports Set!
    </ModalHeader>
    <ModalBody>
      Don't forget to allow them in Windows Firewall. They are:{' '}
      {props.ports}
    </ModalBody>
    <ModalFooter>
      <Button color='primary' onClick={props.onClose}>
        OK
      </Button>
    </ModalFooter>
  </Modal>
)

export default ListeningPortsSuccessModal
