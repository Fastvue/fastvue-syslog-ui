import styled from 'styled-components';
import { Col, TabContent } from 'reactstrap';
import { variables } from 'utils/theme';

export const MainHeadingContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 24px;
  padding-bottom: 8px;
  padding-top: 16px;
  align-content: center;
`;

export const StyledDisplayName = styled.span`
  margin: 0 10px;
  font-size: 28px;
  @media screen and (max-width: ${variables.defaultBreakPoint}) {
    word-break: break-all;
  }
`;
export const StyledSourceIP = styled.span`
  margin-top: 10px;
  @media screen and (max-width: ${variables.defaultBreakPoint}) {
    word-break: break-all;
  }
`;

export const StyledSHALink = styled.a`
  font-size: 10px;
  color: #2399f0;
  margin-left: 2px;
`;

export const StyledTabContent = styled(TabContent)`
  padding: 10px;
  background-color: white;
  border-left: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
`;

const StyledMainContent = styled(Col)`
  background-color: #fafafa;

  @media screen and (min-width: ${variables.defaultBreakPoint}) {
    position: absolute !important;
    top: 59.236px;
    right: 0;
    bottom: 0;
  }
`;

export default StyledMainContent;
