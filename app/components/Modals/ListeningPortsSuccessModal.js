import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';

const ListeningPortsSuccessModal = (props) => (
  <SweetAlert
    success
    closeOnClickOutside
    title="Ports Set!"
    onConfirm={props.onClose}
  >
    Don&apos;t forget to allow them in Windows Firewall. They are: {props.ports}
  </SweetAlert>
);

ListeningPortsSuccessModal.propTypes = {
  onClose: PropTypes.func,
  ports: PropTypes.string
};

export default ListeningPortsSuccessModal;
