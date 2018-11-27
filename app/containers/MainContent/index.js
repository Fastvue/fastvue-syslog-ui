import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tabs from 'components/Tabs';
import StatsTab from 'components/StatsTab';
import ReactTable from 'react-table';

import { Button, TabPane, Alert } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import formatValues from 'utils/helpers';
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
import StyledMainContent, {
  MainHeadingContainer,
  StyledDisplayName,
  StyledSourceIP,
  StyledSHALink,
  StyledTabContent
} from './style';

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

class MainContent extends Component {
  state = {
    fileSorted: [],
    archiveSorted: [],
    statsIntervalId: null,
    globalStatsIntervalId: null
  };
  componentDidMount() {
    this.checkCurrentTabAndFetch();
  }

  componentDidUpdate(prevProps) {
    const { tab } = this.props.match.params;
    if (
      this.props.sourceId !== prevProps.sourceId ||
      prevProps.match.params.tab !== tab
    ) {
      this.checkCurrentTabAndFetch();
    }
  }

  componentWillUnmount() {
    this.clearAllIntervals();
  }

  checkCurrentTabAndFetch = () => {
    const { tab } = this.props.match.params;
    if (this.props.sourceId) {
      this.props.fetchSourceStats(this.props.sourceId);
      
      if (tab === 'files') {
        this.clearAllIntervals();
        this.props.fetchSourceFiles(this.props.sourceId);
      } else if (tab === 'archives') {
        this.clearAllIntervals();
        this.props.fetchSourceArchives(this.props.sourceId);
      } else if (tab === 'stats') {
        this.startIntervalFetching('stats');
      }
    } else {
      this.startIntervalFetching('globalStats');
    }
  };

  startIntervalFetching = (type) => {
    this.clearAllIntervals();
    if (type === 'stats') {
      const statsIntervalId = setInterval(() => {
        this.props.fetchSourceStats(this.props.sourceId);
      }, 5000);
      this.setState({
        statsIntervalId
      });
    } else if (type === 'globalStats') {
      this.props.fetchGlobalStats();
      const globalStatsIntervalId = setInterval(() => {
        this.props.fetchGlobalStats();
      }, 5000);
      this.setState({
        globalStatsIntervalId
      });
    }
  };

  clearAllIntervals = () => {
    clearInterval(this.state.globalStatsIntervalId);
    clearInterval(this.state.statsIntervalId);
  };

  getSortedComponent(id, table) {
    const sortDesc = (
      <FontAwesomeIcon icon="sort-amount-down" color="#282C34" />
    );
    const sortAsc = <FontAwesomeIcon icon="sort-amount-up" color="#282C34" />;
    const noSort = (
      <FontAwesomeIcon rotation={90} icon="exchange-alt" color="#D6D6DE" />
    );

    const sortInfo = this.state[`${table}Sorted`].filter(
      (item) => item.id === id
    );
    if (sortInfo.length) {
      if (sortInfo[0].desc === true) return sortDesc;
      if (sortInfo[0].desc === false) return sortAsc;
    }
    return noSort;
  }

  genericHeaderArrows = (tableName) => ({
    Header: (props) => {
      const Sorted = this.getSortedComponent(props.column.id, tableName);
      return (
        <Fragment>
          {' '}
          <span className={`text-${props.column.HeaderTextAlign}`}>
            {props.column.HeaderText}
          </span>{' '}
          <span style={{ position: 'absolute', right: 7 }}>{Sorted}</span>
        </Fragment>
      );
    },
    headerStyle: { boxShadow: 'none' }
  });
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

    return (
      <StyledMainContent
        xs={12}
        md={12}
        lg={{ size: 8, offset: 4 }}
        xl={{ size: 9, offset: 3 }}
      >
        {this.props.sourceId ? (
          <Fragment>
            <MainHeadingContainer>
              <Link to="/">
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

            <StyledTabContent activeTab={this.props.match.params.tab}>
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
                    className="files_table"
                    minRows={1}
                    data={this.props.files || []}
                    filterable
                    sortable
                    resizable={false}
                    defaultFilterMethod={(filter, row) =>
                      String(row._original[filter.id])
                        .toLowerCase()
                        .includes(String(filter.value).toLowerCase())
                    }
                    noDataText="No matching records found"
                    sorted={this.state.fileSorted}
                    onSortedChange={(fileSorted) =>
                      this.setState({ fileSorted })
                    }
                    columns={[
                      {
                        ...this.genericHeaderArrows('file'),
                        HeaderText: 'Filename',
                        HeaderTextAlign: 'left',
                        id: 'name',
                        accessor: (row) => (
                          <span>
                            <a
                              href={`${
                                process.env.API_URL
                              }/api/sources/getfile?id=${
                                this.props.sourceId
                              }&file=${row.name}`}
                              download={row.name}
                            >
                              {row.name}
                            </a>
                            <StyledSHALink
                              href={`${
                                process.env.API_URL
                              }/api/sources/getfile?id=${
                                this.props.sourceId
                              }&file=${row.sha}`}
                              download={row.sha}
                            >
                              SHA256
                            </StyledSHALink>
                          </span>
                        ),
                        className: 'text-left text-capitalize',
                        style: { whiteSpace: 'unset' }
                      },
                      {
                        id: 'size',
                        ...this.genericHeaderArrows('file'),
                        HeaderText: 'Size',
                        HeaderTextAlign: 'right',
                        accessor: (row) => formatValues('Bytes', row.size),
                        className: 'text-right'
                      },
                      {
                        id: 'messageCount',
                        ...this.genericHeaderArrows('file'),
                        HeaderText: 'Message',
                        HeaderTextAlign: 'right',
                        accessor: (row) =>
                          formatValues('Numeric', row.messageCount),
                        className: 'text-right'
                      },
                      {
                        id: 'modified',
                        ...this.genericHeaderArrows('file'),
                        HeaderText: 'Date',
                        HeaderTextAlign: 'right',
                        accessor: (row) =>
                          new Date(row.modified).toLocaleString(),
                        className: 'text-right',
                        style: { whiteSpace: 'unset' }
                      }
                    ]}
                    defaultPageSize={10}
                  />
                )}

                {this.props.files && this.props.files.length === 0 && (
                  <Alert color="warning">
                    <FontAwesomeIcon icon="exclamation-circle" /> There are no
                    files logs for this Source yet.
                  </Alert>
                )}
              </TabPane>

              <TabPane tabId="archives">
                {this.props.archives && this.props.archives.length !== 0 && (
                  <ReactTable
                    className="archive_table"
                    minRows={1}
                    data={this.props.archives || []}
                    filterable
                    resizable={false}
                    defaultFilterMethod={(filter, row) =>
                      String(row._original[filter.id])
                        .toLowerCase()
                        .includes(String(filter.value).toLowerCase())
                    }
                    noDataText="No matching records found"
                    sorted={this.state.archiveSorted}
                    onSortedChange={(archiveSorted) =>
                      this.setState({ archiveSorted })
                    }
                    columns={[
                      {
                        id: 'name',
                        ...this.genericHeaderArrows('archive'),
                        HeaderText: 'Filename',
                        HeaderTextAlign: 'left',
                        accessor: (row) => (
                          <span>
                            {' '}
                            <a
                              href={`${
                                process.env.API_URL
                              }/api/sources/getarchive?id=${
                                this.props.sourceId
                              }&file=${row.name}`}
                              download={row.name}
                            >
                              {row.name}
                            </a>
                            <StyledSHALink
                              href={`${
                                process.env.API_URL
                              }/api/sources/getarchive?id=${
                                this.props.sourceId
                              }&file=${row.sha}`}
                              download={row.sha}
                            >
                              SHA256
                            </StyledSHALink>
                          </span>
                        ),
                        className: 'text-left',
                        style: { whiteSpace: 'unset' }
                      },
                      {
                        id: 'size',
                        ...this.genericHeaderArrows('archive'),
                        HeaderText: 'Size',
                        HeaderTextAlign: 'right',
                        accessor: (row) => formatValues('Bytes', row.size),
                        className: 'text-right'
                      },
                      {
                        id: 'modified',
                        ...this.genericHeaderArrows('archive'),
                        HeaderText: 'Date',
                        HeaderTextAlign: 'right',
                        accessor: (row) =>
                          new Date(row.modified).toLocaleString(),
                        className: 'text-right',
                        style: { whiteSpace: 'unset' }
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
            </StyledTabContent>
          </Fragment>
        ) : (
          <StatsTab
            statTiles={statTiles}
            subTab={this.props.match.params.subTab}
            chartData={this.props.globalStats.sources}
          />
        )}
      </StyledMainContent>
    );
  }
}

MainContent.propTypes = {
  stats: PropTypes.any,
  files: PropTypes.any,
  globalStats: PropTypes.any,
  archives: PropTypes.any,
  sourceId: PropTypes.string,
  match: PropTypes.any,
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
