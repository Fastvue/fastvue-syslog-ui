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
    font-weight:700;
    color: #565771;
  }
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

/* .ReactTable  .rt-resizable-header-content:after {
    position: absolute;
    right: 8px;
    top: 3px;
    height: 18px;
    width: 18px;
    z-index: 120;
    color: transparent;
    content: '.';
} */

.ReactTable .rt-th.-sort-asc .rt-resizer:before {
  margin-top: 4px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTVWNmw0IDQgMS0xLTYtNi02IDYgMSAxIDQtNHY5eiIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==);
}

.ReactTable .rt-th.-sort-desc .rt-resizer:before {
  margin-top: 4px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCAzdjkuMTNMNCA4IDMgOWw2IDYgNi02LTEtMS00IDQuMTNWM3oiIGZpbGw9IiMzMzMiLz48L3N2Zz4=);
}

`;

export default GlobalStyle;
