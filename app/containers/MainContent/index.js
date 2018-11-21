import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StatTile from 'components/StatTile';
import Tabs from 'components/Tabs';
import StatsTab from 'components/StatsTab';
import ReactTable from 'react-table';

import { Col, Row, Button, TabContent, TabPane, Alert } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  fetchSourceStats,
  fetchGlobalStats,
  fetchSourceFiles,
  fetchSourceArchives
} from './actions';
import {
  makeSelectSourceStats,
  makeSelectSourceFiles,
  makeSelectSourceArchives,
  makeSelectGlobalStats
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import {
  MainHeadingContainer,
  StyledDisplayName,
  StyledSourceIP,
  StyledSHALink
} from './style';
import columns from './temp';

import formatValues from 'utils/helpers';

import './style.scss';

const tabsConfig = [
  {
    id: 'stats',
    title: 'Statistics'
  },
  {
    id: 'files',
    title: 'Files'
  },
  {
    id: 'archives',
    title: 'Archives'
  }
];

class MainContent extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    sorted: []
  };
  componentDidMount() {
    if (this.props.sourceId) {
      this.props.fetchSourceStats(this.props.sourceId);
      this.props.fetchSourceFiles(this.props.sourceId);
      this.props.fetchSourceArchives(this.props.sourceId);
    } else {
      this.props.fetchGlobalStats();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.sourceId !== prevProps.sourceId) {
      if (this.props.sourceId) {
        this.props.fetchSourceStats(this.props.sourceId);
        this.props.fetchSourceFiles(this.props.sourceId);
        this.props.fetchSourceArchives(this.props.sourceId);
      } else {
        this.props.fetchGlobalStats();
      }
    }
  }

  getSortedComponent() {
    // const sortInfo = this.state.sorted.filter((item) => item.id === id);
    // if (sortInfo.length) {
    //   if (sortInfo[0].desc === true) {
    //     return <FontAwesomeIcon icon="sort-amount-down" />;
    //   }
    //   if (sortInfo[0].desc === false) {
    //     return <FontAwesomeIcon icon="sort-amount-up" />;
    //   }
    // }
    return null;
  }
  render() {
    const { stats, globalStats } = this.props;

    const statTiles = [
      {
        id: 0,
        title: 'Messages/sec',
        value: formatValues(
          'Numeric',
          this.props.sourceId
            ? stats.messagesPerSecond
            : globalStats.totalMessagesPerSecond
        )
      },
      {
        id: 1,
        title: 'Total Messages',
        value: formatValues(
          'Numeric',
          this.props.sourceId ? stats.messages : globalStats.totalMessages
        )
      },
      {
        id: 2,
        title: 'Total Log Size',
        value: formatValues(
          'Bytes',
          this.props.sourceId ? stats.size : globalStats.totalLogSize
        )
      },
      {
        id: 3,
        title: 'Total Archive Size',
        value: formatValues(
          'Bytes',
          this.props.sourceId ? stats.archiveSize : globalStats.totalArchiveSize
        )
      }
    ];
    // <FontAwesomeIcon rotation={90} icon="exchange-alt" color="#D6D6D6" />
    const Sorted = null;
    const genericHeaderArrows = () => ({
      Header: (props) => (
        <div className={`text-${props.column.HeaderTextAlign}`}>
          {props.column.HeaderText}
          <span style={{ float: 'right' }}> {Sorted}</span>
        </div>
      ),
      headerStyle: { boxShadow: 'none' }
    });
    return (
      <Col
        xs={12}
        md={12}
        lg={{ size: 8, offset: 4 }}
        xl={{ size: 9, offset: 3 }}
      >
        {this.props.sourceId ? (
          <Fragment>
            <MainHeadingContainer>
              <Link to="/">
                {' '}
                <Button
                  color="success"
                  style={{ verticalAlign: 'middle', margin: 0 }}
                >
                  <FontAwesomeIcon icon="chevron-left" /> Back
                </Button>
              </Link>
              <StyledDisplayName className="h4">
                {this.props.stats.displayName}
              </StyledDisplayName>
              <StyledSourceIP>({this.props.stats.sourceIP})</StyledSourceIP>
            </MainHeadingContainer>
            {this.props.activeSource && this.props.activeSource.error && (
              <Alert color="danger">
                <FontAwesomeIcon icon="exclamation-circle" /> Could not resolve
                IP address for {this.props.stats.sourceHost}: No such host is
                known
              </Alert>
            )}
            <Tabs
              activeTab={this.props.match.params.tab}
              tabs={tabsConfig}
              onActiveTabChange={(tabId) =>
                this.props.history.push(
                  `/source/${this.props.sourceId}/${tabId}${
                    tabId === 'stats' ? '/size' : ''
                  }`
                )
              }
            />

            <TabContent
              activeTab={this.props.match.params.tab}
              className="tabContent"
            >
              {/* <Route />{' '} */}
              <TabPane tabId="stats">
                <StatsTab
                  statTiles={statTiles}
                  subTab={this.props.match.params.subTab}
                  sourceId={this.props.sourceId}
                  history={this.props.history}
                  chartData={this.props.stats.dates}
                />
              </TabPane>

              <TabPane tabId="files">
                {this.props.files && this.props.files.length !== 0 && (
                  <ReactTable
                    minRows={1}
                    data={this.props.files || []}
                    filterable
                    sortable
                    defaultFilterMethod={(filter, row) =>
                      String(row._original[filter.id])
                        .toLowerCase()
                        .includes(String(filter.value).toLowerCase())
                    }
                    noDataText="No matching records found"
                    columns={[
                      {
                        ...genericHeaderArrows(),
                        HeaderText: 'Filename',
                        HeaderTextAlign: 'left',
                        id: 'name',
                        accessor: (row) => (
                          <span>
                            <a
                              href={`/api/sources/getfile?id=${
                                this.props.sourceId
                              }&amp;file=${row.name}`}
                              download={row.name}
                            >
                              {row.name}
                            </a>
                            <StyledSHALink
                              href={`/api/sources/getfile?id=${
                                this.props.sourceId
                              }&amp;file=${row.sha}`}
                              download={row.sha}
                            >
                              SHA256
                            </StyledSHALink>
                          </span>
                        ),
                        className: 'text-left',
                        width: 343
                      },
                      {
                        id: 'size',
                        ...genericHeaderArrows(),
                        HeaderText: 'Size',
                        HeaderTextAlign: 'right',
                        accessor: (row) => formatValues('Bytes', row.size),
                        className: 'text-right'
                      },
                      {
                        id: 'messageCount',
                        ...genericHeaderArrows(),
                        HeaderText: 'Message',
                        HeaderTextAlign: 'right',
                        accessor: (row) =>
                          formatValues('Numeric', row.messageCount),
                        className: 'text-right'
                      },
                      {
                        id: 'modified',
                        ...genericHeaderArrows(),
                        HeaderText: 'Date',
                        HeaderTextAlign: 'right',
                        accessor: (row) =>
                          new Date(row.modified).toLocaleString(),
                        className: 'text-right'
                      }
                    ]}
                    defaultPageSize={10}
                  />
                )}

                {this.props.archives && this.props.archives.length === 0 && (
                  <Alert color="warning">
                    <FontAwesomeIcon icon="exclamation-circle" /> There are no
                    files logs for this Source yet.
                  </Alert>
                )}
              </TabPane>

              <TabPane tabId="archives">
                {this.props.archives && this.props.archives.length !== 0 && (
                  <ReactTable
                    minRows={1}
                    data={this.props.archives || []}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                      String(row._original[filter.id])
                        .toLowerCase()
                        .includes(String(filter.value).toLowerCase())
                    }
                    noDataText="No matching records found"
                    columns={[
                      {
                        id: 'name',
                        ...genericHeaderArrows(),
                        HeaderText: 'Filename',
                        HeaderTextAlign: 'left',
                        accessor: (row) => (
                          <span>
                            {' '}
                            <a
                              href={`/api/sources/getfile?id=${
                                this.props.sourceId
                              }&amp;file=${row.name}`}
                              download={row.name}
                            >
                              {row.name}
                            </a>
                            <StyledSHALink
                              href={`/api/sources/getfile?id=${
                                this.props.sourceId
                              }&amp;file=${row.sha}`}
                              download={row.sha}
                            >
                              SHA256
                            </StyledSHALink>
                          </span>
                        ),
                        className: 'text-left',
                        width: 343
                      },
                      {
                        id: 'size',
                        ...genericHeaderArrows(),
                        HeaderText: 'Size',
                        HeaderTextAlign: 'right',
                        accessor: (row) => formatValues('Bytes', row.size),
                        className: 'text-right'
                      },
                      {
                        id: 'modified',
                        ...genericHeaderArrows(),
                        HeaderText: 'Date',
                        HeaderTextAlign: 'right',
                        accessor: (row) =>
                          new Date(row.modified).toLocaleString(),
                        className: 'text-right'
                      }
                    ]}
                    defaultPageSize={10}
                  />
                )}

                {this.props.archives && this.props.archives.length === 0 && (
                  <Alert color="warning">
                    <FontAwesomeIcon icon="exclamation-circle" /> There are no
                    archived logs for this Source yet.
                  </Alert>
                )}
              </TabPane>
            </TabContent>
          </Fragment>
        ) : (
          <StatsTab
            statTiles={statTiles}
            subTab={this.props.match.params.subTab}
            chartData={this.props.globalStats.sources}
          />
        )}
      </Col>
    );
  }
}

MainContent.propTypes = {
  stats: PropTypes.any,
  files: PropTypes.any,
  globalStats: PropTypes.any,
  archives: PropTypes.any,
  sourceId: PropTypes.string,
  activeSource: PropTypes.any,
  fetchSourceFiles: PropTypes.func,
  fetchSourceStats: PropTypes.func,
  fetchSourceArchives: PropTypes.func,
  fetchGlobalStats: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  fetchSourceStats: (sourceId) => dispatch(fetchSourceStats(sourceId)),
  fetchSourceFiles: (sourceId) => dispatch(fetchSourceFiles(sourceId)),
  fetchSourceArchives: (sourceId) => dispatch(fetchSourceArchives(sourceId)),
  fetchGlobalStats: () => dispatch(fetchGlobalStats())
});

const mapStateToProps = createStructuredSelector({
  stats: makeSelectSourceStats(),
  files: makeSelectSourceFiles(),
  archives: makeSelectSourceArchives(),
  globalStats: makeSelectGlobalStats()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'maincontent', reducer });
const withSaga = injectSaga({ key: 'maincontent', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(MainContent);
export { mapDispatchToProps };
