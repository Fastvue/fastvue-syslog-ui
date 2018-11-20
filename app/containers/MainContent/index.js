import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Tile from 'components/Tile';

import { Col, Row, Button } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchSourceStats } from './actions';
import { makeSelectSourceStats } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { MainHeadingContainer } from './style';

import './style.scss';

class MainContent extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchSourceStats(this.props.sourceId);
  }

  componentDidUpdate(prevProps) {}
  render() {
    return (
      <Col
        xs={12}
        md={12}
        lg={{ size: 8, offset: 4 }}
        xl={{ size: 9, offset: 3 }}
      >
        <MainHeadingContainer>
          <Button color="success">
            <FontAwesomeIcon icon="chevron-left" /> Back
          </Button>
          <span className="h2"> {this.props.stats.displayName} </span>
          <span className="h4"> ( {this.props.stats.sourceIP} ) </span>
        </MainHeadingContainer>
      </Col>
    );
  }
}

MainContent.propTypes = {
  stats: PropTypes.any,
  sourceId: PropTypes.string
};

const mapDispatchToProps = (dispatch) => ({
  fetchSourceStats: (sourceId) => dispatch(fetchSourceStats(sourceId))
});

const mapStateToProps = createStructuredSelector({
  stats: makeSelectSourceStats()
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
