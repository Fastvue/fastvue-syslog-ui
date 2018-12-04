import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Tile from 'components/Tile';
import SourceListItem from 'components/SourceListItem';
import SourceEditor from 'components/SourceEditor';

import { Row } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  DeleteSourceModal,
  ListeningPortsModal,
  ListeningPortsSuccessModal,
  DeleteSourceSuccessModal,
  AddSourceSuccessModal
} from 'components/Modals';

import {
  updatePorts,
  fetchPorts,
  fetchAndUpdateGlobalSettings
} from 'containers/App/actions';

import {
  makeSelectListeningPorts,
  makeSelectGlobalSettings
} from 'containers/App/selectors';

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
  makeSelectIsListeningPortSuccessModalOpen,
  makeSelectIsDeleteSourceSuccessModalOpen,
  makeSelectToBeDeletedSource,
  makeSelectAddOrUpdateSourceLoading,
  makeSelectIsAddSourceSuccessModalOpen
} from './selectors';

import reducer from './reducer';
import saga from './saga';

import StyledSideBar, { StyledTileContainer } from './style';

class SideBar extends Component {
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
      !prevProps.isListeningPortModalOpen &&
      this.props.isListeningPortModalOpen
    ) {
      this.props.fetchPorts();
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
    this.props.fetchAndUpdateGlobalSettings(
      this.props.globalSettings.autoDiscover
    );
  };

  handleListeningPortsModalSubmit = (ports) => {
    this.props.closeListeningPortModal();
    this.props.updatePorts(ports);
    this.props.toggleListeningPortSuccessModal();
  };

  handleDeleteSourceModalSubmit = () => {
    this.props.closeDeleteSourceModal();
    this.props.deleteSource(this.props.toBeDeletedSource.id);
    this.props.toggleDeleteSourceSuccessModal();
  };

  handleSourceSettingButtonClick = (id) => {
    this.props.openSourceEditor(id);
    if (this.props.isAddSysLogSourceOpen) {
      this.props.closeSyslogSourceAddForm();
    }
  };

  render() {
    return (
      <StyledSideBar md={12} lg={4} xl={3}>
        {this.props.isListeningPortModalOpen && (
          <ListeningPortsModal
            ports={this.props.listeningPorts}
            onClose={this.props.closeListeningPortModal}
            onSubmit={this.handleListeningPortsModalSubmit}
          />
        )}

        {this.props.isDeleteSourceModalOpen && (
          <DeleteSourceModal
            displayName={this.props.toBeDeletedSource.displayName}
            onClose={this.props.closeDeleteSourceModal}
            onSubmit={this.handleDeleteSourceModalSubmit}
          />
        )}

        {this.props.isListeningPortSuccessModalOpen && (
          <ListeningPortsSuccessModal
            ports={this.props.listeningPorts}
            onClose={this.props.toggleListeningPortSuccessModal}
          />
        )}

        {this.props.isAddSourceSuccessModalOpen && (
          <AddSourceSuccessModal
            onClose={this.props.toggleAddSourceSuccessModal}
          />
        )}

        {this.props.isDeleteSourceSuccessModalOpen && (
          <DeleteSourceSuccessModal
            displayName={this.props.toBeDeletedSource.displayName}
            onClose={this.props.toggleDeleteSourceSuccessModal}
          />
        )}

        <StyledTileContainer>
          <Tile
            variant="autoDiscover"
            label="Auto Discover"
            onClick={this.fetchAndUpdateGlobalSettings}
            isAutoDiscoverOn={this.props.globalSettings.autoDiscover}
          />
          {this.props.globalSettings.autoDiscover ? (
            <Tile
              onClick={this.props.openListeningPortModal}
              variant="listeningPort"
              label="Listening Ports"
            />
          ) : (
            <Tile
              onClick={this.props.openSyslogSourceAddForm}
              variant="addSource"
              label="Add Syslog Source"
            />
          )}
        </StyledTileContainer>
        <Row>
          {this.props.isAddSysLogSourceOpen && (
            <SourceEditor
              loading={this.props.addOrUpdateSourceLoading}
              onFormCancel={this.props.closeSyslogSourceAddForm}
              onFormSubmit={this.props.addOrUpdateSource}
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
              onSettingButtonClick={this.handleSourceSettingButtonClick}
              onSourceEditorCancel={this.props.closeSourceEditor}
              addOrUpdateSource={this.props.addOrUpdateSource}
              onDeleteButtonClick={(sourceId, sourceDisplayName) => {
                this.props.openDeleteSourceModal();
                this.props.updateToBeDeletedSource(sourceId, sourceDisplayName);
              }}
            />
          ))}
        </Row>
      </StyledSideBar>
    );
  }
}

SideBar.propTypes = {
  isAddSysLogSourceOpen: PropTypes.bool,
  globalSettings: PropTypes.object,
  sourceList: PropTypes.any,
  activeSourceId: PropTypes.any,
  sourceIdWhoseSourceEditorIsOpen: PropTypes.any,
  isDeleteSourceSuccessModalOpen: PropTypes.bool,
  isListeningPortSuccessModalOpen: PropTypes.bool,
  isDeleteSourceModalOpen: PropTypes.bool,
  isListeningPortModalOpen: PropTypes.bool,
  toBeDeletedSource: PropTypes.any,
  addOrUpdateSourceLoading: PropTypes.bool,
  isAddSourceSuccessModalOpen: PropTypes.bool,
  history: PropTypes.any,
  listeningPorts: PropTypes.string,
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
  fetchAndUpdateGlobalSettings: PropTypes.func,
  fetchPorts: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  toggleSourceAutoDiscover: (...args) =>
    dispatch(toggleSourceAutoDiscover(...args)),
  fetchSourceList: () => dispatch(fetchSourceList()),
  openSyslogSourceAddForm: () => dispatch(openSyslogSourceAddForm()),
  closeSyslogSourceAddForm: () => dispatch(closeSyslogSourceAddForm()),
  openListeningPortModal: () => dispatch(openListeningPortModal()),
  closeListeningPortModal: () => dispatch(closeListeningPortModal()),
  openSourceEditor: (id) => dispatch(openSourceEditor(id)),
  closeSourceEditor: () => dispatch(closeSourceEditor()),
  addOrUpdateSource: (...args) => dispatch(addOrUpdateSource(...args)),
  deleteSource: (sourceId) => dispatch(deleteSource(sourceId)),
  updatePorts: (ports) => dispatch(updatePorts(ports)),
  fetchPorts: () => dispatch(fetchPorts()),
  openDeleteSourceModal: () => dispatch(openDeleteSourceModal()),
  closeDeleteSourceModal: () => dispatch(closeDeleteSourceModal()),
  updateToBeDeletedSource: (...args) =>
    dispatch(updateToBeDeletedSource(...args)),
  toggleDeleteSourceSuccessModal: () =>
    dispatch(toggleDeleteSourceSuccessModal()),
  toggleListeningPortSuccessModal: () =>
    dispatch(toggleListeningPortSuccessModal()),
  toggleAddSourceSuccessModal: () => dispatch(toggleAddSourceSuccessModal()),
  updateActiveSource: (source) => dispatch(updateActiveSource(source)),
  fetchAndUpdateGlobalSettings: (autoDiscover) =>
    dispatch(fetchAndUpdateGlobalSettings(autoDiscover))
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

const withReducer = injectReducer({ key: 'sideBar', reducer });
const withSaga = injectSaga({ key: 'sideBar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter
)(SideBar);
export { mapDispatchToProps };
