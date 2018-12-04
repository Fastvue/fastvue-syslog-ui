import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';

const AddSourceSuccessModal = (props) => (
  <SweetAlert
    success
    closeOnClickOutside
    onConfirm={props.onClose}
    title="Added!"
  >
    Syslog source {props.displayName} added successfully.
  </SweetAlert>
);
AddSourceSuccessModal.propTypes = {
  displayName: PropTypes.string,
  onClose: PropTypes.func
};
export default AddSourceSuccessModal;
