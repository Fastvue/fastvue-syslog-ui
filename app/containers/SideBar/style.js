import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import { variables } from 'utils/theme';

const StyledSideBar = styled(Col)`
  background-color: #21232e;
  color: white;

  @media screen and (min-width: ${variables.defaultBreakPoint}) {
    position: absolute !important;
    top: ${variables.headerHeight};
    left: 0;
    overflow-x: hidden;
    bottom: 0;
  }
`;

export const StyledTileContainer = styled(Row)`
  background-color: #e4e4e4;
  min-height: 67px;
  margin-bottom: 12px;
`;

export default StyledSideBar;
