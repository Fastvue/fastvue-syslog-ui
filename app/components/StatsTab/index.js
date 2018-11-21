import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'reactstrap';
import StatTile from 'components/StatTile';
import { Link } from 'react-router-dom';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './style.scss';
import { StyledButtonGroup } from './styles';

import {
  colors,
  singleSeriesBytesChartOptions,
  multiSeriesBytesChartOptions,
  singleSeriesNumericChartOptions,
  multiSeriesNumericChartOptions
} from './chartOptions';

const options = {
  colors,
  ...multiSeriesBytesChartOptions
};

const StatsTab = (props) => (
  <Col>
    <Row>
      {' '}
      {props.statTiles.map((tile) => (
        <StatTile key={tile.id} {...tile} />
      ))}
    </Row>
    <Row style={{ position: 'relative' }}>
      <StyledButtonGroup>
        <Button
          active={props.subTab === 'size'}
          size="sm"
          onClick={() =>
            props.history.push(`/source/${props.sourceId}/stats/size`)
          }
        >
          Size
        </Button>
        <Button
          size="sm"
          active={props.subTab === 'messages'}
          onClick={() =>
            props.history.push(`/source/${props.sourceId}/stats/messages`)
          }
        >
          Messages
        </Button>
      </StyledButtonGroup>

      <HighchartsReact highcharts={Highcharts} options={options} />
    </Row>
  </Col>
);

StatsTab.propTypes = {
  statTiles: PropTypes.any,
  subTab: PropTypes.any,
  sourceId: PropTypes.any,
  history: PropTypes.any
};

export default StatsTab;
