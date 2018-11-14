import { fromJS } from 'immutable';
import {
  TOGGLE_AUTO_DISCOVER_BUTTON,
  FETCH_SOURCE_LIST,
  FETCH_SOURCE_LIST_SUCCESS,
  FETCH_SOURCE_LIST_FAIL
} from './constants';

const initialState = fromJS({
  isAutoDiscoverOn: false,
  sourceList: [
    {
      id: 'cd583d2ef96b4cf680f380bb6d7f027f',
      enabled: true,
      name: '',
      displayName: '',
      sourceHost: 'DESKTOP-5NANGTR',
      sourceIP: '127.0.0.1',
      port: 514,
      forwardEnabled: false,
      forwardHost: '',
      forwardIP: '0.0.0.0',
      forwardPort: 514,
      forwardTransport: 'UDP',
      logFolder: '{defaultlogpath}\\{host}',
      logFilename: '{host}-{date}.log',
      archiveEnabled: true,
      archiveFolder: '{defaultarchivepath}\\{host}',
      archiveFormat: 'ZIP',
      archivePeriod: 30,
      error: ''
    },
    {
      id: 'aa688eaf7f694393afbb94a983111ab2',
      enabled: true,
      name: '',
      displayName: 'fdsfdsf',
      sourceHost: 'sdfdsfdsfds',
      sourceIP: '0.0.0.0',
      port: 514,
      forwardEnabled: false,
      forwardHost: '',
      forwardIP: '0.0.0.0',
      forwardPort: 514,
      forwardTransport: 'UDP',
      logFolder: '{defaultlogpath}\\{host}',
      logFilename: '{host}-{date}.log',
      archiveEnabled: true,
      archiveFolder: '{defaultarchivepath}\\{host}',
      archiveFormat: 'ZIP',
      archivePeriod: 30,
      error:
        'Could not resolve IP address for sdfdsfdsfds: No such host is known'
    },
    {
      id: 'a51b061ed3724717aaf7107508d86d8b',
      enabled: true,
      name: '',
      displayName: 'dsfdsfdsfsd',
      sourceHost: 'fdsfdsfdsf',
      sourceIP: '0.0.0.0',
      port: 514,
      forwardEnabled: false,
      forwardHost: '',
      forwardIP: '0.0.0.0',
      forwardPort: 514,
      forwardTransport: 'UDP',
      logFolder: '{defaultlogpath}\\{host}',
      logFilename: '{host}-{date}.log',
      archiveEnabled: true,
      archiveFolder: '{defaultarchivepath}\\{host}',
      archiveFormat: 'ZIP',
      archivePeriod: 30,
      error:
        'Could not resolve IP address for fdsfdsfdsf: No such host is known'
    },
    {
      id: 'b215a473d7fa4626b5c551209e25e4ba',
      enabled: false,
      name: '',
      displayName: 'sdfdsfsdfsd',
      sourceHost: 'fdsfsdfsdfsdf',
      sourceIP: '0.0.0.0',
      port: 514,
      forwardEnabled: false,
      forwardHost: '',
      forwardIP: '0.0.0.0',
      forwardPort: 514,
      forwardTransport: 'UDP',
      logFolder: '{defaultlogpath}\\{host}',
      logFilename: '{host}-{date}.log',
      archiveEnabled: true,
      archiveFolder: '{defaultarchivepath}\\{host}',
      archiveFormat: 'ZIP',
      archivePeriod: 30,
      error:
        'Could not resolve IP address for fdsfsdfsdfsdf: No such host is known'
    },
    {
      id: 'd5527992aacb4b4aaacaf0ece657529c',
      enabled: true,
      name: '',
      displayName: 'dfsdfsdfsd',
      sourceHost: 'sfsdfdsfdsf',
      sourceIP: '0.0.0.0',
      port: 514,
      forwardEnabled: false,
      forwardHost: '',
      forwardIP: '0.0.0.0',
      forwardPort: 514,
      forwardTransport: 'UDP',
      logFolder: '{defaultlogpath}\\{host}',
      logFilename: '{host}-{date}.log',
      archiveEnabled: true,
      archiveFolder: '{defaultarchivepath}\\{host}',
      archiveFormat: 'ZIP',
      archivePeriod: 30,
      error:
        'Could not resolve IP address for sfsdfdsfdsf: No such host is known'
    }
  ]
});

function sideBarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_AUTO_DISCOVER_BUTTON:
      return state.set('isAutoDiscoverOn', !state.get('isAutoDiscoverOn'));
    case FETCH_SOURCE_LIST:
      return state.set('isAutoDiscoverOn', !state.get('isAutoDiscoverOn'));
    case FETCH_SOURCE_LIST_SUCCESS:
      return state.set('sourceList', action.sourceList);
    case FETCH_SOURCE_LIST_FAIL:
      return state.set('isAutoDiscoverOn', !state.get('isAutoDiscoverOn'));
    default:
      return state;
  }
}

export default sideBarReducer;
