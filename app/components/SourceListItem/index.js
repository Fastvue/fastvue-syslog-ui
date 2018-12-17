import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HashLink } from 'react-router-hash-link';
import ToggleButton from 'components/ToggleButton';
import SourceEditor from 'components/SourceEditor';
import { pick as _pick } from 'lodash';

import StyledSourceListItem from './style';

const SourceListItem = (props) => {
  const formData = _pick(props, [
    'archiveEnabled',
    'archiveFolder',
    'archivePeriod',
    'displayName',
    'forwardEnabled',
    'forwardHost',
    'forwardPort',
    'forwardTransport',
    'logFilename',
    'logFolder',
    'port',
    'sourceHost'
  ]);
  return (
    <StyledSourceListItem
      xs="12"
      lg="12"
      className={`${props.id ===
        (props.match.params && props.match.params.id) && 'highlights'}`}
      onClick={() => props.history.push(`/source/${props.id}/stats/size`)}
      id={`sourceEditor${props.id}`}
    >
      <Row>
        <Col xs="10" md="10">
          <h1> {props.displayName || props.sourceHost} </h1>
          <div>
            <ToggleButton
              isButtonOn={props.enabled}
              onClick={() => props.onToggleButtonClick(props.id, props.enabled)}
            />
          </div>
        </Col>
        <Col xs="2" md="2">
          <Row className="actions">
            <HashLink
              smooth
              to={`#sourceEditor${props.id}`}
              className={`btn btn-secondary ${
                props.isSourceEditorOpen ? 'activated' : ''
              }`}
              role="button"
              onClick={() => {
                props.onSettingButtonClick(props.id);
                if (props.isSourceEditorOpen) {
                  props.onSourceEditorCancel();
                }
              }}
            >
              <FontAwesomeIcon icon="cog" />
            </HashLink>

            <Button
              className={props.activeSourceId === props.id ? 'activated' : ''}
            >
              <FontAwesomeIcon icon="eye" />
            </Button>
            <Button
              onClick={() =>
                props.onDeleteButtonClick(props.id, props.displayName)
              }
            >
              <FontAwesomeIcon icon="times" />
            </Button>
            {!!props.error && (
              <Button color="danger">
                <FontAwesomeIcon icon="exclamation-circle" />
              </Button>
            )}
          </Row>
        </Col>
      </Row>
      {props.isSourceEditorOpen && (
        <Row>
          <SourceEditor
            onFormCancel={props.onSourceEditorCancel}
            onFormSubmit={props.addOrUpdateSource}
            loading={props.addOrUpdateSourceLoading}
            formData={formData}
            id={props.id}
          />
        </Row>
      )}
    </StyledSourceListItem>
  );
};

SourceListItem.propTypes = {
  id: PropTypes.string,
  sourceHost: PropTypes.string,
  enabled: PropTypes.bool,
  error: PropTypes.string,
  activeSourceId: PropTypes.string,
  isSourceEditorOpen: PropTypes.bool,
  addOrUpdateSourceLoading: PropTypes.bool,
  onToggleButtonClick: PropTypes.func,
  onSettingButtonClick: PropTypes.func,
  onSourceEditorCancel: PropTypes.func,
  addOrUpdateSource: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  displayName: PropTypes.string
};

export default withRouter(SourceListItem);
