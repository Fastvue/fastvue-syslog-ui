import styled from 'styled-components';
import { Navbar } from 'reactstrap';
import { variables } from 'utils/theme';

export const StyledLogo = styled.img`
  width: 160px;
  height: 27px;
`;
export const StyledAppVersion = styled.div`
  padding-left: 5px;
  padding-top: 10px;
  font-size: small;
  float: right;
`;

const StyledNavbar = styled(Navbar)`
  @media screen and (min-width: ${variables.defaultBreakPoint}) {
    height: ${variables.headerHeight};
  }
  min-height: ${variables.headerHeight};
  background-color: #21232e;
`;

export default StyledNavbar;
