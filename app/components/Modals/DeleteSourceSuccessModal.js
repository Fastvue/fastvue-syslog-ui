import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';

const DeleteSourceSuccessModal = (props) => (
  <SweetAlert
    success
    closeOnClickOutside
    title="Deleted!"
    onConfirm={props.onClose}
  >
    Syslog source {props.displayName} deleted.
  </SweetAlert>
);

DeleteSourceSuccessModal.propTypes = {
  onClose: PropTypes.func,
  displayName: PropTypes.string
};

export default DeleteSourceSuccessModal;
