import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

import styled from 'styled-components';

const StyledStatTile = styled(Col)`
  display: inline-block;
  text-align: center;
`;
const StyledTitle = styled.h2`
  font-size: 12pt;
  margin: 20px 0 10px 0;
`;
const StyledValue = styled.h1`
  font-size: 30pt;
  margin: 20px 0 10px 0;
`;

const StatTile = (props) => (
  <StyledStatTile md="12" lg="6" xl="3">
    <StyledStatTile>
      <StyledTitle> {props.title}</StyledTitle>
      <StyledValue> {props.value}</StyledValue>
    </StyledStatTile>
  </StyledStatTile>
);

StatTile.propTypes = {
  title: PropTypes.string,
  value: PropTypes.any
};

export default StatTile;
