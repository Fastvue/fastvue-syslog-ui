import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';

const AuthFailModal = (props) => (
  <SweetAlert
    danger
    closeOnClickOutside
    confirmBtnText="Ok"
    confirmBtnBsStyle="primary"
    cancelBtnBsStyle="default"
    title="Login Failed"
    onConfirm={props.onClose}
  >
    Invalid username or password.
  </SweetAlert>
);

AuthFailModal.propTypes = {
  onClose: PropTypes.func
};
export default AuthFailModal;
