import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'reactstrap';
import StatTile from 'components/StatTile';
import { Link } from 'react-router-dom';

import Highcharts from 'highcharts';
import './style.scss';
import { StyledButtonGroup, StyledHighchartsReact } from './styles';

import {
  colors,
  singleSeriesBytesChartOptions,
  multiSeriesBytesChartOptions,
  singleSeriesNumericChartOptions,
  multiSeriesNumericChartOptions
} from './chartOptions';

// eslint-disable-next-line react/prefer-stateless-function
class StatsTab extends Component {
  render() {
    const series = [];
    const logFilesSeries = {
      name: 'Log File Size',
      data: []
    };
    const archiveSeries = {
      name: 'Archived Log Size',
      data: []
    };
    const messageSeries = {
      name: 'Number of Messages',
      data: []
    };
    const chartSeriesOption =
      this.props.subTab === 'size'
        ? multiSeriesBytesChartOptions
        : singleSeriesNumericChartOptions;

    if (this.props.chartData && this.props.chartData.length > 0) {
      this.props.chartData.forEach((stat) => {
        if (this.props.subTab === 'size') {
          logFilesSeries.data.push([stat.date, stat.size]);
          archiveSeries.data.push([stat.date, stat.archiveSize]);
        } else {
          messageSeries.data.push([stat.date, stat.messages]);
        }
      });
      if (this.props.subTab === 'size') {
        series.push(logFilesSeries, archiveSeries);
      } else {
        series.push(messageSeries);
      }
    }

    const options = {
      colors,
      ...chartSeriesOption,
      series
    };
    return (
      <Col>
        <Row>
          {' '}
          {this.props.statTiles.map((tile) => (
            <StatTile key={tile.id} {...tile} />
          ))}
        </Row>
        <Row style={{ position: 'relative' }}>
          <Col xs="12" lg="12">
            <StyledButtonGroup>
              <Button
                active={this.props.subTab === 'size'}
                size="sm"
                onClick={() =>
                  this.props.history.push(
                    `/source/${this.props.sourceId}/stats/size`
                  )
                }
              >
                Size
              </Button>
              <Button
                size="sm"
                active={this.props.subTab === 'messages'}
                onClick={() =>
                  this.props.history.push(
                    `/source/${this.props.sourceId}/stats/messages`
                  )
                }
              >
                Messages
              </Button>
            </StyledButtonGroup>

            <StyledHighchartsReact highcharts={Highcharts} options={options} />
          </Col>
        </Row>
      </Col>
    );
  }
}

StatsTab.propTypes = {
  statTiles: PropTypes.any,
  subTab: PropTypes.any,
  sourceId: PropTypes.any,
  history: PropTypes.any,
  chartData: PropTypes.any
};

export default StatsTab;
