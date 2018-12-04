import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Input
} from 'reactstrap';

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
    return (
      <Modal isOpen toggle={this.props.onClose}>
        <ModalHeader toggle={this.props.onClose}>
          Edit Syslog Listening Ports
        </ModalHeader>
        <ModalBody>
          Enter each port to listen on, separated by commas
          <Input
            type="text"
            value={this.state.ports}
            onChange={(e) => {
              this.setState({ ports: e.target.value });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.onClose}>
            Cancel
          </Button>{' '}
          <Button
            color="primary"
            onClick={() => this.props.onSubmit(this.state.ports)}
          >
            OK
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ListeningPortsModal.propTypes = {
  ports: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ListeningPortsModal;
