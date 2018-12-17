import styled from 'styled-components';
import { ButtonGroup } from 'reactstrap';

export const StyledButtonGroup = styled(ButtonGroup)`
  position: absolute !important;
  top: 0;
  right: 7px;
  z-index: 50;
  margin-top: 6px;
  padding-right: 15px;
  @media (max-width: 767px) {
    right: -15px !important;
  }
`;
