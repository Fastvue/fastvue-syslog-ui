import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import StatTile from 'components/StatTile';
import Tabs from 'components/Tabs';
import ReactTable from 'react-table';

import { Col, Row, Button, TabContent, TabPane } from 'reactstrap';
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
    id: '0',
    title: 'Statistics'
  },
  {
    id: '1',
    title: 'Files'
  },
  {
    id: '2',
    title: 'Archives'
  }
];

class MainContent extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    activeTab: '0'
  };

  componentDidMount() {
    this.props.fetchSourceStats(this.props.sourceId);
    this.props.fetchSourceFiles(this.props.sourceId);
    this.props.fetchSourceArchives(this.props.sourceId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.sourceId !== prevProps.sourceId) {
      this.props.fetchSourceStats(this.props.sourceId);
      this.props.fetchSourceFiles(this.props.sourceId);
      this.props.fetchSourceArchives(this.props.sourceId);
    }
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
    return (
      <Col
        xs={12}
        md={12}
        lg={{ size: 8, offset: 4 }}
        xl={{ size: 9, offset: 3 }}
      >
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

        <Tabs
          activeTab={this.state.activeTab}
          tabs={tabsConfig}
          onActiveTabChange={(tabId) => this.setState({ activeTab: tabId })}
        />
        <TabContent activeTab={this.state.activeTab} className="tabContent">
          {/* <Route />{' '} */}
          <TabPane tabId="0">
            <Row>
              {' '}
              {statTiles.map((tile) => (
                <StatTile key={tile.id} {...tile} />
              ))}
            </Row>
          </TabPane>

          <TabPane tabId="1">
            <ReactTable
              minRows={0}
              data={this.props.files || []}
              columns={[
                {
                  id: 'filename',
                  Header: 'Filename',
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
                  Header: 'Size',
                  accessor: (row) => formatValues('Bytes', row.size),
                  className: 'text-right'
                },
                {
                  id: 'messages',
                  Header: 'Messages',
                  accessor: (row) => formatValues('Numeric', row.messageCount),
                  className: 'text-right'
                },
                {
                  id: 'modified',
                  Header: 'Date',
                  accessor: (row) => formatValues('Temporal', row.modified),
                  className: 'text-right'
                }
              ]}
              defaultPageSize={10}
            />
          </TabPane>

          <TabPane tabId="2">
            <ReactTable
              minRows={0}
              data={this.props.archives || []}
              columns={[
                {
                  id: 'filename',
                  Header: 'Filename',
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
                  Header: 'Size',
                  accessor: (row) => formatValues('Bytes', row.size),
                  className: 'text-right'
                },
                {
                  id: 'messages',
                  Header: 'Messages',
                  accessor: (row) => formatValues('Numeric', row.messageCount),
                  className: 'text-right'
                },
                {
                  id: 'modified',
                  Header: 'Date',
                  accessor: (row) => formatValues('Temporal', row.modified),
                  className: 'text-right'
                }
              ]}
              defaultPageSize={10}
            />
          </TabPane>
        </TabContent>
      </Col>
    );
  }
}

MainContent.propTypes = {
  stats: PropTypes.any,
  files: PropTypes.array,
  archives: PropTypes.array,
  sourceId: PropTypes.string,
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
  withConnect,
  withRouter
)(MainContent);
export { mapDispatchToProps };
