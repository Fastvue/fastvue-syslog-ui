import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
  html,
  body {
    height: 100%;
    width: 100%;
    
  }
 
  body.fontLoaded {
  
  }
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
 

.btn:focus,.btn:active {
   outline: none !important;
   box-shadow: none !important;
}
.form-group {
  label {
    font-weight:600;
    color: #565771;
  }
}

.initSetupHeading{
  color: black !important;
  font-size: 20px !important;
  font-weight: 700;

}

.line {
 border-bottom: 1px solid #e9ecef;
 margin: 10px 0;
}
 .-odd {
   background-color: #F9F9F9;
 }


.marginFix {
  margin-left: 20px;
}



.files_table .-header .rt-tr div:nth-child(1), .files_table .rt-tbody .rt-tr div:nth-child(1),.files_table .-filters .rt-tr div:nth-child(1) {
 width:41% !important;
}

.files_table .-header .rt-tr div:nth-child(2), .files_table .rt-tbody .rt-tr div:nth-child(2),.files_table .-filters .rt-tr div:nth-child(2){
 width: 12% !important;
}

.files_table .-header .rt-tr div:nth-child(3), .files_table .rt-tbody .rt-tr div:nth-child(3),.files_table .-filters .rt-tr div:nth-child(3){
 width: 18% !important;
}

.files_table .-header .rt-tr div:nth-child(4), .files_table .rt-tbody .rt-tr div:nth-child(4),.files_table .-filters .rt-tr div:nth-child(4){
 width: 29% !important;
}

.files_table .rt-resizable-header{
 padding: 6px !important;
}


.archive_table .-header .rt-tr div:nth-child(1), .archive_table .rt-tbody .rt-tr div:nth-child(1),.archive_table .-filters .rt-tr div:nth-child(1) {
 width: 56% !important;
}

.archive_table .-header .rt-tr div:nth-child(2), .archive_table .rt-tbody .rt-tr div:nth-child(2),.archive_table .-filters .rt-tr div:nth-child(2){
 width: 13% !important;
}

.archive_table .-header .rt-tr div:nth-child(3), .archive_table .rt-tbody .rt-tr div:nth-child(3),.archive_table .-filters .rt-tr div:nth-child(3){
 width: 31% !important;
}
.ReactTable .rt-th {
  text-align: left !important;
}

.ReactTable .rt-thead.-header{
 box-shadow: none;
}

.ReactTable .-pagination{
 box-shadow:none;
}


.ReactTable .rt-th .text-right{
 position: absolute;
 right: 30px;
}




.drawer {
  margin: 0 !important;
  width: 100%;
  position: fixed !important;
  margin: auto;
  height: 100%;
  right: 0!important;
  top: 0!important;
  -webkit-transform: translate3d(0%, 0, 0);
  -ms-transform: translate3d(0%, 0, 0);
  -o-transform: translate3d(0%, 0, 0);
  transform: translate3d(0%, 0, 0);

  .modal-content {
    height: 100%;
    overflow-y: auto;
  }

  .modal-body {
    padding: 15px 15px 80px;
  }

}

`;

export default GlobalStyle;
