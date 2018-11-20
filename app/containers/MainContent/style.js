import styled from 'styled-components';

const MainHeadingContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 24px;
  padding-bottom: 8px;
  padding-top: 16px;
  align-content: center;
`;

const StyledDisplayName = styled.span`
  margin: 0 10px;
  font-size: 28px;
`;
const StyledSourceIP = styled.span`
  margin-top: 10px;
`;

export { MainHeadingContainer, StyledDisplayName, StyledSourceIP };
