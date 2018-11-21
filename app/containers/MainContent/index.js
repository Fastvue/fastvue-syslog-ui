import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import StatTile from 'components/StatTile';
import Tabs from 'components/Tabs';
import ReactTable from 'react-table';

import { Col, Row, Button, TabContent, TabPane, Alert } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  fetchSourceStats,
  fetchSourceFiles,
  fetchSourceArchives
} from './actions';
import {
  makeSelectSourceStats,
  makeSelectSourceFiles,
  makeSelectSourceArchives
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import {
  MainHeadingContainer,
  StyledDisplayName,
  StyledSourceIP
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
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.sourceId !== prevProps.sourceId && this.props.sourceId) {
      this.props.fetchSourceStats(this.props.sourceId);
      this.props.fetchSourceFiles(this.props.sourceId);
      this.props.fetchSourceArchives(this.props.sourceId);
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
    return <FontAwesomeIcon icon="exchange-alt" />;
  }
  render() {
    const { stats } = this.props;
    const statTiles = [
      {
        id: 0,
        title: 'Messages/sec',
        value: formatValues('Numeric', stats.messagesPerSecond)
      },
      {
        id: 1,
        title: 'Total Messages',
        value: formatValues('Numeric', stats.messages)
      },
      {
        id: 2,
        title: 'Total Log Size',
        value: formatValues('Bytes', stats.size)
      },
      {
        id: 3,
        title: 'Total Archive Size',
        value: formatValues('Bytes', stats.archiveSize)
      }
    ];
    const Sorted = <FontAwesomeIcon rotation={90} icon="exchange-alt" />;
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
        {this.props.sourceId && (
          <Fragment>
            <MainHeadingContainer>
              <Button
                color="success"
                style={{ verticalAlign: 'middle', margin: 0 }}
              >
                <FontAwesomeIcon icon="chevron-left" /> Back
              </Button>
              <StyledDisplayName className="h4">
                {this.props.stats.displayName}
              </StyledDisplayName>
              <StyledSourceIP>({this.props.stats.sourceIP})</StyledSourceIP>
            </MainHeadingContainer>
            {this.props.activeSource && this.props.activeSource.error && (
              <Alert color="danger">
                <FontAwesomeIcon icon="exclamation-circle" /> Could not resolve
                IP address for {this.props.stats.displayName}: No such host is
                known
              </Alert>
            )}
            <Tabs
              activeTab={this.props.match.params.tab}
              tabs={tabsConfig}
              onActiveTabChange={(tabId) =>
                this.props.history.push(
                  `/source/${this.props.sourceId}/${tabId}`
                )
              }
            />
          </Fragment>
        )}
        <TabContent
          activeTab={this.props.match.params.tab}
          className="tabContent"
        >
          {/* <Route />{' '} */}
          <TabPane tabId="stats">
            <Row>
              {' '}
              {statTiles.map((tile) => (
                <StatTile key={tile.id} {...tile} />
              ))}
            </Row>
          </TabPane>

          <TabPane tabId="files">
            {this.props.files && this.props.files.length !== 0 && (
              <ReactTable
                minRows={0}
                data={this.props.files || []}
                columns={[
                  {
                    ...genericHeaderArrows(),
                    HeaderText: 'Filename',
                    HeaderTextAlign: 'left',
                    id: 'filename',
                    accessor: (row) => (
                      <a
                        href={`/api/sources/getfile?id=${
                          this.props.sourceId
                        }&amp;file=${row.name}`}
                        download={row.name}
                      >
                        {row.name}
                      </a>
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
                    id: 'messages',
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
                    accessor: (row) => new Date(row.modified).toLocaleString(),
                    className: 'text-right'
                  }
                ]}
                defaultPageSize={10}
              />
            )}

            {this.props.archives && this.props.archives.length === 0 && (
              <Alert color="warning">
                <FontAwesomeIcon icon="exclamation-circle" /> There are no files
                logs for this Source yet.
              </Alert>
            )}
          </TabPane>

          <TabPane tabId="archives">
            {this.props.archives && this.props.archives.length !== 0 && (
              <ReactTable
                minRows={0}
                data={this.props.archives || []}
                columns={[
                  {
                    id: 'filename',
                    ...genericHeaderArrows(),
                    HeaderText: 'Filename',
                    HeaderTextAlign: 'left',
                    accessor: (row) => (
                      <a
                        href={`/api/sources/getfile?id=${
                          this.props.sourceId
                        }&amp;file=${row.name}`}
                        download={row.name}
                      >
                        {row.name}
                      </a>
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
                    id: 'messages',
                    ...genericHeaderArrows(),
                    HeaderText: 'Messages',
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
                    accessor: (row) => new Date(row.modified).toLocaleString(),
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
      </Col>
    );
  }
}

MainContent.propTypes = {
  stats: PropTypes.any,
  files: PropTypes.any,
  archives: PropTypes.any,
  sourceId: PropTypes.string,
  activeSource: PropTypes.any,
  fetchSourceFiles: PropTypes.func,
  fetchSourceStats: PropTypes.func,
  fetchSourceArchives: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  fetchSourceStats: (sourceId) => dispatch(fetchSourceStats(sourceId)),
  fetchSourceFiles: (sourceId) => dispatch(fetchSourceFiles(sourceId)),
  fetchSourceArchives: (sourceId) => dispatch(fetchSourceArchives(sourceId))
});

const mapStateToProps = createStructuredSelector({
  stats: makeSelectSourceStats(),
  files: makeSelectSourceFiles(),
  archives: makeSelectSourceArchives()
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
