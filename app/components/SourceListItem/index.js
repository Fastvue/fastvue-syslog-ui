import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HashLink } from 'react-router-hash-link';
import ToggleButton from 'components/ToggleButton';
import SourceEditor from 'components/SourceEditor';
import { pick as _pick } from 'lodash';

import './style.scss';

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
    <Col
      xs="12"
      lg="12"
      className={`sourceListItem ${props.id ===
        (props.match.params && props.match.params.id) && 'highlights'}`}
      onClick={(e) => props.history.push(`/source/${props.id}/stats/size`)}
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
                props.isSourceEditorOpen ? 'active' : ''
              }`}
              role="button"
              onClick={() => {
                props.onSettingButtonClick(props.id);
                props.isSourceEditorOpen && props.onSourceEditorCancel();
              }}
            >
              <FontAwesomeIcon icon="cog" />
            </HashLink>

            <Button
              className={props.activeSourceId === props.id ? 'active' : ''}
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
    </Col>
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
  onDeleteButtonClick: PropTypes.func
};

export default withRouter(SourceListItem);
