import styled from 'styled-components';

const StyledToggleButton = styled.div`
  width: 75px;
  height: 25px;
  position: relative;
  .switch {
    width: 75px;
    height: 25px;
  }

  .switch {
    position: absolute;
    border: 2px solid #636363;
    border-radius: 20px;
    -webkit-transition: border-color 0.6s ease-out;
    transition: border-color 0.6s ease-out;
    box-sizing: border-box;
  }

  .switch.switch-on {
    border-color: #81c126;
    -webkit-transition: all 0.5s 0.15s ease-out;
    transition: all 0.5s 0.15s ease-out;
  }

  .switch-button {
    position: absolute;
    top: 4px;
    width: 28px;
    bottom: 4px;
    right: 39px;
    background-color: #444249;
    border-radius: 19px;
    cursor: pointer;
    -webkit-transition: all 0.3s 0.1s, width 0.1s, top 0.1s, bottom 0.1s;
    transition: all 0.3s 0.1s, width 0.1s, top 0.1s, bottom 0.1s;
  }

  .switch-on .switch-button {
    top: 3px;
    width: 65px;
    bottom: 3px;
    right: 3px;
    border-radius: 23px;
    background-color: #81c126;
    box-shadow: 0 0 16px #4b7a8d;
    -webkit-transition: all 0.2s 0.1s, right 0.1s;
    transition: all 0.2s 0.1s, right 0.1s;
  }

  .switch-text-on {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 23px;
    text-align: center;
    font-family: 'Quicksand', sans-serif;
    font-size: 12px;
    font-weight: normal;
    cursor: pointer;
    -webkit-user-select: none; /* Chrome/Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */

    color: rgba(0, 0, 0, 0);
  }

  .switch-on .switch-text-on {
    color: #fff;
    -webkit-transition: color 0.3s 0.15s;
    transition: color 0.3s 0.15s;
  }

  .switch-text-off {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 6px;
    line-height: 23px;
    text-align: center;
    font-family: 'Quicksand', sans-serif;
    font-size: 14px;
    font-weight: bold;
    -webkit-user-select: none; /* Chrome/Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    cursor: pointer;
    color: #444249;
  }

  .switch-on .switch-text-off {
    color: rgba(0, 0, 0, 0);
  }

  /* used for streak effect */
  .glow-comp {
    position: absolute;
    opacity: 0;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    border-radius: 6px;
    background-color: rgba(75, 122, 141, 0.1);
    box-shadow: 0 0 12px rgba(75, 122, 141, 0.2);
    -webkit-transition: opacity 4.5s 1s;
    transition: opacity 4.5s 1s;
  }

  .switch-on .glow-comp {
    opacity: 1;
    -webkit-transition: opacity 1s;
    transition: opacity 1s;
  }
`;

export default StyledToggleButton;
