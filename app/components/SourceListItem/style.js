import styled from 'styled-components';
import { Col } from 'reactstrap';

const StyledSourceListItem = styled(Col)`
  padding-bottom: 6px;
  padding-top: 6px;
  cursor: pointer;
  background-color: #21232e;
  border-bottom: 1px solid #303143;

  h1 {
    font-size: 16px;
    color: #b0b0b8;
    margin: 6px 0 12px 0;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    overflow-wrap: break-word;
  }
  .actions {
    padding: 0;
    width: 40px;
    float: right;

    .btn {
      width: 40px;
      display: block;
      border-radius: 0;
      border: 1px solid #21232E; 
      background-color: #303143;
      border-right: 0;
      margin: 0;
      outline: none !important;
      border-image-width: 0;
      &.activated {
        background-color: #fafafa;
        color: #2f3142;
      }
    }
  }
  &.highlights {
    background-color: #303143;
  }
`;

export default StyledSourceListItem;
