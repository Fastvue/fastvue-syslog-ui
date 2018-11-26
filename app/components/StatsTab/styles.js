import styled from 'styled-components';
import { ButtonGroup } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';

export const StyledButtonGroup = styled(ButtonGroup)`
  position: absolute;
  top: 0;
  right: 7px;
  z-index: 50;
  margin-top: 6px;
  padding-right: 15px;
  @media (max-width: 767px) {
    position: relative !important;
    top: 0 !important;
    right: -15px !important;
    margin-bottom: 10px !important;
    float: right !important;
    font-size: 10px;
  }
`;

export const StyledHighchartsReact = styled(HighchartsReact)``;
