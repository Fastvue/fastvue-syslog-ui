import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

import Tile from 'components/Tile';
import SourceListItem from 'components/SourceListItem';
import SourceEditor from 'components/SourceEditor';
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
  Input
} from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  toggleAutoDiscoverButton,
  fetchSourceList,
  toggleSourceAutoDiscoverButton,
  openSyslogSourceAddForm,
  closeSyslogSourceAddForm,
  openListeningPortModal,
  closeListeningPortModal
} from './actions';
import {
  makeSelectIsAutoDiscoverOn,
  makeSelectSourceList,
  makeSelectIsAddSysLogSourceOpen,
  makeSelectIsListeningPortModalOpen
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import './style.scss';

class SideBar extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchSourceList();
  }
  render() {
    return (
      <Col className="sidebar" xs="12" lg="3" md="4">
        <Modal
          isOpen={this.props.isListeningPortModalOpen}
          toggle={() => this.props.closeListeningPortModal()}
          className={this.props.className}
        >
          <ModalHeader toggle={() => this.props.closeListeningPortModal()}>
            Edit Syslog Listening Ports
          </ModalHeader>
          <ModalBody>
            Enter each port to listen on, separated by commas
            <Input type="number" value="514" onChange={() => {}} />
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => this.props.closeListeningPortModal()}
            >
              Cancel
            </Button>{' '}
            <Button
              color="primary"
              onClick={() => this.props.closeListeningPortModal()}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Row className="tileContainer">
          <Tile
            variant="autoDiscover"
            label="Auto Discover"
            onClick={() => this.props.toggleAutoDiscoverButton()}
            isAutoDiscoverOn={this.props.isAutoDiscoverOn}
          />
          {this.props.isAutoDiscoverOn ? (
            <Tile
              onClick={() => {
                this.props.openListeningPortModal();
              }}
              variant="listeningPort"
              label="Listening Ports"
            />
          ) : (
            <Tile
              onClick={() => {
                this.props.openSyslogSourceAddForm();
              }}
              variant="addSource"
              label="Add Syslog Source"
            />
          )}
        </Row>
        <Row>
          {this.props.isAddSysLogSourceOpen && (
            <SourceEditor
              onFormCancel={() => this.props.closeSyslogSourceAddForm()}
            />
          )}
        </Row>
        <Row>
          {this.props.sourceList.map((source) => (
            <SourceListItem
              key={source.id}
              {...source}
              activeSourceId={this.props.activeSourceId}
              onToggleButtonClick={(id) =>
                this.props.toggleSourceAutoDiscoverButton(id)
              }
            />
          ))}
        </Row>
      </Col>
    );
  }
}

SideBar.propTypes = {
  isAutoDiscoverOn: PropTypes.bool.isRequired,
  isAddSysLogSourceOpen: PropTypes.bool,
  toggleAutoDiscoverButton: PropTypes.func.isRequired,
  toggleSourceAutoDiscoverButton: PropTypes.func,
  sourceList: PropTypes.any,
  fetchSourceList: PropTypes.func,
  activeSourceId: PropTypes.any,
  openSyslogSourceAddForm: PropTypes.func,
  closeSyslogSourceAddForm: PropTypes.func,
  openListeningPortModal: PropTypes.func,
  closeListeningPortModal: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  toggleAutoDiscoverButton: () => dispatch(toggleAutoDiscoverButton()),
  toggleSourceAutoDiscoverButton: (sourceId) =>
    dispatch(toggleSourceAutoDiscoverButton(sourceId)),
  fetchSourceList: () => dispatch(fetchSourceList()),
  openSyslogSourceAddForm: () => dispatch(openSyslogSourceAddForm()),
  closeSyslogSourceAddForm: () => dispatch(closeSyslogSourceAddForm()),
  openListeningPortModal: () => dispatch(openListeningPortModal()),
  closeListeningPortModal: () => dispatch(closeListeningPortModal())
});

const mapStateToProps = createStructuredSelector({
  isAutoDiscoverOn: makeSelectIsAutoDiscoverOn(),
  isAddSysLogSourceOpen: makeSelectIsAddSysLogSourceOpen(),
  isListeningPortModalOpen: makeSelectIsListeningPortModalOpen(),
  sourceList: makeSelectSourceList()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'sidebar', reducer });
const withSaga = injectSaga({ key: 'sidebar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(SideBar);
export { mapDispatchToProps };
