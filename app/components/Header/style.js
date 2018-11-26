import styled from 'styled-components';
import { Navbar } from 'reactstrap';

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
  min-height: 50px;
  z-index: 999;
  background-color: #21232e;
`;

export default StyledNavbar;
