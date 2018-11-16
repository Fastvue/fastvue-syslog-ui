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
  toggleAutoDiscover,
  fetchSourceList,
  toggleSourceAutoDiscover,
  openSyslogSourceAddForm,
  closeSyslogSourceAddForm,
  openListeningPortModal,
  closeListeningPortModal,
  openSourceEditor,
  closeSourceEditor,
  addOrUpdateSource,
  deleteSource
} from './actions';
import {
  makeSelectIsAutoDiscoverOn,
  makeSelectSourceList,
  makeSelectIsAddSysLogSourceOpen,
  makeSelectIsListeningPortModalOpen,
  makeSelectSourceIdWhoseSourceEditorIsOpen
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
              onDeleteButtonClick={this.props.deleteSource}
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
  toggleSourceAutoDiscover: PropTypes.func,
  fetchSourceList: PropTypes.func,
  openSyslogSourceAddForm: PropTypes.func,
  closeSyslogSourceAddForm: PropTypes.func,
  openListeningPortModal: PropTypes.func,
  closeListeningPortModal: PropTypes.func,
  openSourceEditor: PropTypes.func,
  closeSourceEditor: PropTypes.func,
  addOrUpdateSource: PropTypes.func,
  deleteSource: PropTypes.func
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
  deleteSource: (sourceId) => dispatch(deleteSource(sourceId))
});

const mapStateToProps = createStructuredSelector({
  isAutoDiscoverOn: makeSelectIsAutoDiscoverOn(),
  isAddSysLogSourceOpen: makeSelectIsAddSysLogSourceOpen(),
  isListeningPortModalOpen: makeSelectIsListeningPortModalOpen(),
  sourceList: makeSelectSourceList(),
  sourceIdWhoseSourceEditorIsOpen: makeSelectSourceIdWhoseSourceEditorIsOpen()
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
