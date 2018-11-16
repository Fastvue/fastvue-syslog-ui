import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

import Tile from 'components/Tile';
import SourceListItem from 'components/SourceListItem';
import SourceEditor from 'components/SourceEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  toggleAutoDiscover,
  fetchSourceList,
  toggleSourceAutoDiscover,
  openSyslogSourceAddForm,
  closeSyslogSourceAddForm,
  openListeningPortModal,
  closeListeningPortModal,
  openDeleteSourceModal,
  closeDeleteSourceModal,
  openSourceEditor,
  closeSourceEditor,
  addOrUpdateSource,
  deleteSource,
  setPorts,
  updateToBeDeletedSource,
  toggleDeleteSourceSuccessModal,
  toggleListeningPortSuccessModal
} from './actions';
import {
  makeSelectIsAutoDiscoverOn,
  makeSelectSourceList,
  makeSelectIsAddSysLogSourceOpen,
  makeSelectIsListeningPortModalOpen,
  makeSelectSourceIdWhoseSourceEditorIsOpen,
  makeSelectIsDeleteSourceModalOpen,
  makeSelectListeningPorts,
  makeSelectIsListeningPortSuccessModalOpen,
  makeSelectIsDeleteSourceSuccessModalOpen
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
        >
          <ModalHeader toggle={() => this.props.closeListeningPortModal()}>
            Edit Syslog Listening Ports
          </ModalHeader>
          <ModalBody>
            Enter each port to listen on, separated by commas
            <Input
              type="text"
              value={this.props.listeningPorts}
              onChange={(e) => {
                this.setState({ ports: e.target.value });
              }}
            />
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
              onClick={() => {
                this.props.closeListeningPortModal();
                this.props.setPorts(this.props.listeningPorts);
                this.props.toggleListeningPortSuccessModal();
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        {/* DeleteModal */}
        <Modal
          isOpen={this.props.isDeleteSourceModalOpen}
          toggle={() => this.props.closeDeleteSourceModal()}
        >
          <ModalHeader toggle={() => this.props.closeDeleteSourceModal()}>
            Are you sure?
          </ModalHeader>
          {/* <FontAwesomeIcon icon="exclamation-circle" /> */}
          <ModalBody>Delete syslog source Hello World?</ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => this.props.closeDeleteSourceModal()}
            >
              Cancel
            </Button>{' '}
            <Button
              color="danger"
              onClick={() => {
                this.props.closeDeleteSourceModal();
                this.props.deleteSource(this.props.toBeDeletedSource);
                this.props.toggleDeleteSourceSuccessModal();
              }}
            >
              Yes, delete it !
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.props.isListeningPortSuccessModalOpen}
          toggle={this.props.toggleListeningPortSuccessModal}
        >
          <ModalHeader toggle={this.props.toggleListeningPortSuccessModal}>
            Ports Set!
          </ModalHeader>
          <ModalBody>
            Don't forget to allow them in Windows Firewall. They are: 514
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.props.toggleListeningPortSuccessModal}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.props.isDeleteSourceSuccessModalOpen}
          toggle={this.props.toggleDeleteSourceSuccessModal}
        >
          <ModalHeader toggle={this.props.toggleDeleteSourceSuccessModal}>
            Deleted!
          </ModalHeader>
          <ModalBody>Syslog source Hello World deleted.</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.props.toggleDeleteSourceSuccessModal}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Row className="tileContainer">
          <Tile
            variant="autoDiscover"
            label="Auto Discover"
            onClick={() => this.props.toggleAutoDiscover()}
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
              onFormSubmit={(fields) => {
                console.log(fields);
                this.props.addOrUpdateSource(fields);
              }}
            />
          )}
        </Row>
        <Row>
          {this.props.sourceList.map((source) => (
            <SourceListItem
              key={source.id}
              {...source}
              activeSourceId={this.props.activeSourceId}
              isSourceEditorOpen={
                this.props.sourceIdWhoseSourceEditorIsOpen === source.id
              }
              onToggleButtonClick={(id, isSourceEnabled) =>
                this.props.toggleSourceAutoDiscover(id, isSourceEnabled)
              }
              onSettingButtonClick={this.props.openSourceEditor}
              onSourceEditorCancel={this.props.closeSourceEditor}
              addOrUpdateSource={this.props.addOrUpdateSource}
              onDeleteButtonClick={(sourceId) => {
                this.props.openDeleteSourceModal();
                this.props.updateToBeDeletedSource(sourceId);
              }}
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
  toggleAutoDiscover: PropTypes.func.isRequired,
  sourceList: PropTypes.any,
  activeSourceId: PropTypes.any,
  sourceIdWhoseSourceEditorIsOpen: PropTypes.any,
  listeningPorts: PropTypes.any,
  isDeleteSourceSuccessModalOpen: PropTypes.bool,
  isListeningPortSuccessModalOpen: PropTypes.bool,
  isDeleteSourceModalOpen: PropTypes.bool,
  isListeningPortModalOpen: PropTypes.bool,
  toggleSourceAutoDiscover: PropTypes.func,
  fetchSourceList: PropTypes.func,
  openSyslogSourceAddForm: PropTypes.func,
  closeSyslogSourceAddForm: PropTypes.func,
  openListeningPortModal: PropTypes.func,
  closeListeningPortModal: PropTypes.func,
  openSourceEditor: PropTypes.func,
  closeSourceEditor: PropTypes.func,
  addOrUpdateSource: PropTypes.func,
  deleteSource: PropTypes.func,
  setPorts: PropTypes.func,
  openDeleteSourceModal: PropTypes.func,
  closeDeleteSourceModal: PropTypes.func,
  updateToBeDeletedSource: PropTypes.func,
  toBeDeletedSource: PropTypes.func,
  toggleDeleteSourceSuccessModal: PropTypes.func,
  toggleListeningPortSuccessModal: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  toggleAutoDiscover: () => dispatch(toggleAutoDiscover()),
  toggleSourceAutoDiscover: (sourceId, isSourceEnabled) =>
    dispatch(toggleSourceAutoDiscover(sourceId, isSourceEnabled)),
  fetchSourceList: () => dispatch(fetchSourceList()),
  openSyslogSourceAddForm: () => dispatch(openSyslogSourceAddForm()),
  closeSyslogSourceAddForm: () => dispatch(closeSyslogSourceAddForm()),
  openListeningPortModal: () => dispatch(openListeningPortModal()),
  closeListeningPortModal: () => dispatch(closeListeningPortModal()),
  openSourceEditor: (id) => dispatch(openSourceEditor(id)),
  closeSourceEditor: () => dispatch(closeSourceEditor()),
  addOrUpdateSource: (fields, id) => dispatch(addOrUpdateSource(fields, id)),
  deleteSource: (sourceId) => dispatch(deleteSource(sourceId)),
  setPorts: (ports) => dispatch(setPorts(ports)),
  openDeleteSourceModal: () => dispatch(openDeleteSourceModal()),
  closeDeleteSourceModal: () => dispatch(closeDeleteSourceModal()),
  updateToBeDeletedSource: (sourceId) =>
    dispatch(updateToBeDeletedSource(sourceId)),
  toggleDeleteSourceSuccessModal: () =>
    dispatch(toggleDeleteSourceSuccessModal()),
  toggleListeningPortSuccessModal: () =>
    dispatch(toggleListeningPortSuccessModal())
});

const mapStateToProps = createStructuredSelector({
  isAutoDiscoverOn: makeSelectIsAutoDiscoverOn(),
  isAddSysLogSourceOpen: makeSelectIsAddSysLogSourceOpen(),
  isListeningPortModalOpen: makeSelectIsListeningPortModalOpen(),
  sourceList: makeSelectSourceList(),
  sourceIdWhoseSourceEditorIsOpen: makeSelectSourceIdWhoseSourceEditorIsOpen(),
  isDeleteSourceModalOpen: makeSelectIsDeleteSourceModalOpen(),
  listeningPorts: makeSelectListeningPorts(),
  isListeningPortSuccessModalOpen: makeSelectIsListeningPortSuccessModalOpen(),
  isDeleteSourceSuccessModalOpen: makeSelectIsDeleteSourceSuccessModalOpen()
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
