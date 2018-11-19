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
`;

export default GlobalStyle;
