import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';

const DeleteSourceModal = (props) => (
  <SweetAlert
    warning
    showCancel
    closeOnClickOutside
    confirmBtnText="Yes, delete it!"
    confirmBtnBsStyle="danger"
    cancelBtnBsStyle="secondary"
    title="Are you sure?"
    onConfirm={props.onSubmit}
    onCancel={props.onClose}
  >
    Delete syslog source {props.displayName}?
  </SweetAlert>
);
DeleteSourceModal.propTypes = {
  displayName: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};
export default DeleteSourceModal;
