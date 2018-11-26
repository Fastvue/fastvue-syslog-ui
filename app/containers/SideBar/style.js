import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import { variables } from 'utils/theme';

const StyledSideBar = styled(Col)`
  background-color: #21232e;
  color: white;

  @media screen and (min-width: ${variables.defaultBreakPoint}) {
    position: absolute !important;
    top: 59.236px;
    left: 0;
    overflow-x: hidden;

    // For equal height of sidebar and main-content
    padding-bottom: 99999px;
    margin-bottom: -99999px;
  }

  @media (max-width: 767px) {
    max-height: 220px;
    overflow-y: scroll;
  }
`;

export const StyledTileContainer = styled(Row)`
  background-color: #e4e4e4;
  min-height: 67px;
  margin-bottom: 12px;
`;

export default StyledSideBar;
