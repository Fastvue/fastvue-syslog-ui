import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

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

import { makeSelectGlobalSettings } from 'containers/HomePage/selectors';
import { fetchAndUpdateGlobalSettings } from 'containers/HomePage/actions';

import {
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
  updatePorts,
  fetchPorts,
  updateToBeDeletedSource,
  toggleDeleteSourceSuccessModal,
  toggleListeningPortSuccessModal,
  toggleAddSourceSuccessModal,
  updateActiveSource
} from './actions';
import {
  makeSelectSourceList,
  makeSelectIsAddSysLogSourceOpen,
  makeSelectIsListeningPortModalOpen,
  makeSelectSourceIdWhoseSourceEditorIsOpen,
  makeSelectIsDeleteSourceModalOpen,
  makeSelectListeningPorts,
  makeSelectIsListeningPortSuccessModalOpen,
  makeSelectIsDeleteSourceSuccessModalOpen,
  makeSelectToBeDeletedSource,
  makeSelectAddOrUpdateSourceLoading,
  makeSelectIsAddSourceSuccessModalOpen
} from './selectors';

import reducer from './reducer';
import saga from './saga';

import './style.scss';

class SideBar extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchSourceList();
   
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isDeleteSourceSuccessModalOpen !==
        prevProps.isDeleteSourceSuccessModalOpen &&
      this.props.isDeleteSourceSuccessModalOpen
    ) {
      this.props.history.push('/');
    }

    if (
      this.props.activeSourceId !== prevProps.activeSourceId &&
      this.props.activeSourceId
    ) {
      const activeSource = this.props.sourceList.find(
        (source) => source.id === this.props.activeSourceId
      );
      this.props.updateActiveSource(activeSource);
    }
  }
  fetchAndUpdateGlobalSettings = () => {
    console.log(this.props.globalSettings);
    this.props.fetchAndUpdateGlobalSettings(
      this.props.globalSettings.autoDiscover
    );
  };

  render() {
    return (
      <Col className="sidebar" md={12} lg={4} xl={3}>
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
                this.props.updatePorts(this.props.listeningPorts);
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
          <ModalBody>
            Delete syslog source {this.props.toBeDeletedSource.displayName}?
          </ModalBody>
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
                this.props.deleteSource(this.props.toBeDeletedSource.id);
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
            Don't forget to allow them in Windows Firewall. They are:{' '}
            {this.props.listeningPorts}
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
          isOpen={this.props.isAddSourceSuccessModalOpen}
          toggle={this.props.toggleAddSourceSuccessModal}
        >
          <ModalHeader toggle={this.props.toggleAddSourceSuccessModal}>
            Added!
          </ModalHeader>
          <ModalBody>Syslog source added successfully.</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.props.toggleAddSourceSuccessModal}
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
          <ModalBody>
            Syslog source {this.props.toBeDeletedSource.displayName} deleted.
          </ModalBody>
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
            onClick={this.fetchAndUpdateGlobalSettings}
            isAutoDiscoverOn={this.props.globalSettings.autoDiscover}
          />
          {this.props.globalSettings.autoDiscover ? (
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
              loading={this.props.addOrUpdateSourceLoading}
              onFormCancel={() => this.props.closeSyslogSourceAddForm()}
              onFormSubmit={(fields) => {
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
              addOrUpdateSourceLoading={this.props.addOrUpdateSourceLoading}
              activeSourceId={this.props.activeSourceId}
              isSourceEditorOpen={
                this.props.sourceIdWhoseSourceEditorIsOpen === source.id
              }
              onToggleButtonClick={(id, isSourceEnabled) =>
                this.props.toggleSourceAutoDiscover(id, isSourceEnabled)
              }
              onSettingButtonClick={(id) => {
                this.props.openSourceEditor(id);
                this.props.isAddSysLogSourceOpen &&
                  this.props.closeSyslogSourceAddForm();
              }}
              onSourceEditorCancel={this.props.closeSourceEditor}
              addOrUpdateSource={this.props.addOrUpdateSource}
              onDeleteButtonClick={(sourceId, sourceDisplayName) => {
                this.props.openDeleteSourceModal();
                this.props.updateToBeDeletedSource(sourceId, sourceDisplayName);
              }}
            />
          ))}
        </Row>
      </Col>
    );
  }
}

SideBar.propTypes = {
  isAddSysLogSourceOpen: PropTypes.bool,
  globalSettings: PropTypes.object,
  sourceList: PropTypes.any,
  activeSourceId: PropTypes.any,
  sourceIdWhoseSourceEditorIsOpen: PropTypes.any,
  listeningPorts: PropTypes.any,
  isDeleteSourceSuccessModalOpen: PropTypes.bool,
  isListeningPortSuccessModalOpen: PropTypes.bool,
  isDeleteSourceModalOpen: PropTypes.bool,
  isListeningPortModalOpen: PropTypes.bool,
  toBeDeletedSource: PropTypes.any,
  addOrUpdateSourceLoading: PropTypes.bool,
  isAddSourceSuccessModalOpen: PropTypes.bool,
  history: PropTypes.any,
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
  updatePorts: PropTypes.func,
  openDeleteSourceModal: PropTypes.func,
  closeDeleteSourceModal: PropTypes.func,
  updateToBeDeletedSource: PropTypes.func,
  toggleDeleteSourceSuccessModal: PropTypes.func,
  toggleListeningPortSuccessModal: PropTypes.func,
  toggleAddSourceSuccessModal: PropTypes.func,
  updateActiveSource: PropTypes.func,
  fetchAndUpdateGlobalSettings: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
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
  updatePorts: (ports) => dispatch(updatePorts(ports)),
  fetchPorts: () => dispatch(fetchPorts()),
  openDeleteSourceModal: () => dispatch(openDeleteSourceModal()),
  closeDeleteSourceModal: () => dispatch(closeDeleteSourceModal()),
  updateToBeDeletedSource: (sourceId, displayName) =>
    dispatch(updateToBeDeletedSource(sourceId, displayName)),
  toggleDeleteSourceSuccessModal: () =>
    dispatch(toggleDeleteSourceSuccessModal()),
  toggleListeningPortSuccessModal: () =>
    dispatch(toggleListeningPortSuccessModal()),
  toggleAddSourceSuccessModal: () => dispatch(toggleAddSourceSuccessModal()),
  updateActiveSource: (source) => dispatch(updateActiveSource(source)),
  fetchAndUpdateGlobalSettings: (autoDiscover) =>
    dispatch(fetchAndUpdateGlobalSettings(autoDiscover)),
  fetchPorts: () => dispatch(fetchPorts())
});

const mapStateToProps = createStructuredSelector({
  isAddSysLogSourceOpen: makeSelectIsAddSysLogSourceOpen(),
  isListeningPortModalOpen: makeSelectIsListeningPortModalOpen(),
  sourceList: makeSelectSourceList(),
  sourceIdWhoseSourceEditorIsOpen: makeSelectSourceIdWhoseSourceEditorIsOpen(),
  isDeleteSourceModalOpen: makeSelectIsDeleteSourceModalOpen(),
  listeningPorts: makeSelectListeningPorts(),
  isListeningPortSuccessModalOpen: makeSelectIsListeningPortSuccessModalOpen(),
  isDeleteSourceSuccessModalOpen: makeSelectIsDeleteSourceSuccessModalOpen(),
  toBeDeletedSource: makeSelectToBeDeletedSource(),
  addOrUpdateSourceLoading: makeSelectAddOrUpdateSourceLoading(),
  isAddSourceSuccessModalOpen: makeSelectIsAddSourceSuccessModalOpen(),
  globalSettings: makeSelectGlobalSettings()
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
  withConnect,
  withRouter
)(SideBar);
export { mapDispatchToProps };
