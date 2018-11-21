import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';
import StatTile from 'components/StatTile';
import './style.scss';

const StatsTab = (props) => (
  <Row>
    {' '}
    {props.statTiles.map((tile) => (
      <StatTile key={tile.id} {...tile} />
    ))}
  </Row>
);

StatsTab.propTypes = {
  statTiles: PropTypes.any
};

export default StatsTab;
