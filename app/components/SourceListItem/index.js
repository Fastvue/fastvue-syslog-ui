import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToggleButton from 'components/ToggleButton';
import SourceEditor from 'components/SourceEditor';

import './style.scss';

const SourceListItem = (props) => (
  <Col className="sourceListItem" onClick={(e) => {}} xs="12" lg="12">
    <Row>
      <Col xs="10" md="10">
        <h1 className="h1 title"> {props.sourceHost} </h1>
        <div>
          <ToggleButton isButtonOn={props.enabled} />
        </div>
      </Col>
      <Col className="actions" xs="2" md="2">
        <Button>
          <FontAwesomeIcon icon="cog" />
        </Button>
        <Button>
          <FontAwesomeIcon icon="eye" />
        </Button>
        <Button>
          <FontAwesomeIcon icon="times" />
        </Button>
        {!!props.error && (
          <Button color="danger">
            <FontAwesomeIcon icon="exclamation-circle" />
          </Button>
        )}
      </Col>
    </Row>
    <SourceEditor {...props} />
  </Col>
);

SourceListItem.propTypes = {
  sourceHost: PropTypes.string,
  enabled: PropTypes.bool,
  error: PropTypes.string
};

export default SourceListItem;
