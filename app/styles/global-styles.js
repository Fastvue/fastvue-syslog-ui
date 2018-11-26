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
  body {
   
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


 .ReactTable .rt-resizable-header {
    padding: 6px 24px !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
}
 
.ReactTable .rt-resizer:before {
    display: inline-block;
    position: absolute;
    right: 25px;
    top: 3px;
    height: 18px;
    width: 18px;
    color: transparent;
    content: '.';
    background-size: 18px 18px;
    background-repeat: no-repeat; 
    opacity: 0.87;
}


.marginFix {
  margin-left: 20px;
}

.ReactTable .rt-th.-sort-asc .rt-resizer:before {
  margin-top: 4px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTVWNmw0IDQgMS0xLTYtNi02IDYgMSAxIDQtNHY5eiIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==);
}

.ReactTable .rt-th.-sort-desc .rt-resizer:before {
  margin-top: 4px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCAzdjkuMTNMNCA4IDMgOWw2IDYgNi02LTEtMS00IDQuMTNWM3oiIGZpbGw9IiMzMzMiLz48L3N2Zz4=);
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


.ReactTable .rt-thead.-header{
 box-shadow: none;
}

.ReactTable .-pagination{
 box-shadow:none;
}

.ReactTable .rt-th .text-right{
 position: absolute;
 right: 10px;
}

`;

export default GlobalStyle;
