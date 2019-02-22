import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SweetAlert from 'react-bootstrap-sweetalert';

class ListeningPortsModal extends PureComponent {
  state = {
    ports: this.props.ports
  };

  componentDidUpdate(prevProps) {
    if (prevProps.ports !== this.props.ports) {
      this.setState({ ports: this.props.ports });
    }
  }
  render() {
    if (this.state.ports) {
      return (
        <SweetAlert
          input
          closeOnClickOutside
          defaultValue={this.state.ports}
          showCancel
          confirmBtnText="OK"
          cancelBtnText="Cancel"
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="secondary"
          confirmBtnCssClass="btn btn-success"
          cancelBtnCssClass="btn btn-danger"        
          title="Edit Syslog Listening Ports"
          onConfirm={(inputValue) => this.props.onSubmit(inputValue)}
          onCancel={this.props.onClose}
        >
          Enter each port to listen on, separated by commas
        </SweetAlert>
      );
    }
    return null;
  }
}

ListeningPortsModal.propTypes = {
  ports: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ListeningPortsModal;
