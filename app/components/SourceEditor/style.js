import styled from 'styled-components';
import { Col, Button, TabContent } from 'reactstrap';

export const StyledTabContent = styled(TabContent)`
  padding: 1em;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
`;

export const StyledHalfButton = styled(Button)`
  width: 49%;
`;

const StyledSourceEditor = styled(Col)`
  background-color: #ffffff;
  color: black;
  padding: 12px 6px;
`;

export default StyledSourceEditor;
