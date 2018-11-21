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
  state = {
    subTab: 'size'
  };
  render() {
    console.log(this.props.chartData);
    let series = [];
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

    const sizePerDaySeries = [];
    const msgPerDaySeries = [];

    let chartSeriesOption;
    if (this.props.sourceId) {
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

      chartSeriesOption =
        this.props.subTab === 'size'
          ? multiSeriesBytesChartOptions
          : singleSeriesNumericChartOptions;
    } else if (Array.isArray(this.props.chartData)) {
      if (this.state.subTab === 'size') {
        this.props.chartData.forEach((source) => {
          const sizeSeries = {
            name: source.sourceHost,
            data: []
          };

          if (source.dates !== null && source.dates.length > 0) {
            source.dates.forEach((stat) => {
              sizeSeries.data.push([stat.date, stat.size]);
            });
            sizePerDaySeries.push(sizeSeries);
          }
        });
      } else {
        this.props.chartData.forEach((source) => {
          const msgSeries = {
            name: source.sourceHost,
            data: []
          };

          if (source.dates !== null && source.dates.length > 0) {
            source.dates.forEach((stat) => {
              msgSeries.data.push([stat.date, stat.messages]);
            });

            msgPerDaySeries.push(msgSeries);
          }
        });
      }

      if (this.state.subTab === 'size') {
        series = sizePerDaySeries;
      } else {
        series = msgPerDaySeries;
      }
      chartSeriesOption =
        this.state.subTab === 'size'
          ? multiSeriesBytesChartOptions
          : singleSeriesNumericChartOptions;
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
                active={
                  this.props.sourceId
                    ? this.props.subTab === 'size'
                    : this.state.subTab === 'size'
                }
                size="sm"
                onClick={() =>
                  (this.props.sourceId
                    ? this.props.history.push(
                        `/source/${this.props.sourceId}/stats/size`
                      )
                    : this.setState({ subTab: 'size' }))
                }
              >
                Size
              </Button>
              <Button
                size="sm"
                active={
                  this.props.sourceId
                    ? this.props.subTab === 'messages'
                    : this.state.subTab === 'messages'
                }
                onClick={() =>
                  (this.props.sourceId
                    ? this.props.history.push(
                        `/source/${this.props.sourceId}/stats/messages`
                      )
                    : this.setState({ subTab: 'messages' }))
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
