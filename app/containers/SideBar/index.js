import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

import Tile from 'components/Tile';
import SourceListItem from 'components/SourceListItem';
import { Row, Col } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { toggleAutoDiscoverButton, fetchSourceList } from './actions';
import { makeSelectIsAutoDiscoverOn, makeSelectSourceList } from './selectors';
import reducer from './reducer';
import saga from './saga';

import './style.scss';

class SideBar extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchSourceList();
  }
  render() {
    console.log(this.props.sourceList);
    return (
      <Col className="sidebar" xs="12" lg="3">
        <Row className="tileContainer">
          <Tile
            variant="autoDiscover"
            label="Auto Discover"
            onClick={() => this.props.toggleAutoDiscoverButton()}
            isAutoDiscoverOn={this.props.isAutoDiscoverOn}
          />
          <Tile
            onClick={console.log}
            variant={
              this.props.isAutoDiscoverOn ? 'listeningPort' : 'addSource'
            }
            label={
              this.props.isAutoDiscoverOn
                ? 'Listening Ports'
                : 'Add Syslog Source'
            }
          />

          {this.props.sourceList.map((source) => (
            <SourceListItem key={source.id} {...source} />
          ))}
        </Row>
      </Col>
    );
  }
}

SideBar.propTypes = {
  isAutoDiscoverOn: PropTypes.bool.isRequired,
  toggleAutoDiscoverButton: PropTypes.func.isRequired,
  sourceList: PropTypes.any,
  fetchSourceList: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  toggleAutoDiscoverButton: () => dispatch(toggleAutoDiscoverButton()),
  fetchSourceList: () => dispatch(fetchSourceList())
});

const mapStateToProps = createStructuredSelector({
  isAutoDiscoverOn: makeSelectIsAutoDiscoverOn(),
  sourceList: makeSelectSourceList()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'sidebar', reducer });
const withSaga = injectSaga({ key: 'sidebar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(SideBar);
export { mapDispatchToProps };
