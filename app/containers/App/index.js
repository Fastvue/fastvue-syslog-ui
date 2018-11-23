import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import HomePage from 'containers/HomePage/Loadable';
import GlobalSettings from 'containers/GlobalSettings/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import './style.scss';
import GlobalStyle from './../../styles/global-styles';
import Header from 'components/Header';
import Login from 'components/Login';
import { login } from './actions';
import { makeSelectIsLoggedIn, makeSelectIsLoggingIn } from './selectors';

import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  state = {
    toLogin: false,
    toRoutes: true,
    toInitalSetup: false
  };
  componentDidMount() {
    // document.cookies.onChanged.addListener((changeInfo) => {
    //   console.log(changeInfo);
    // });

    const cookie = document.cookie;
    console.log(cookie);
    if (!cookie) {
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.setState({
        toLogin: false,
        toRoutes: true,
        toInitalSetup: false
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="app-wrapper">
        <Header />
        {this.state.toRoutes && (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/source/:id/:tab(stats|files|archives)?/:subTab(size|messages)?"
              component={HomePage}
            />
            <Route exact path="/settings" component={GlobalSettings} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        )}
        {this.state.toLogin && (
          <Login onSubmit={(fields) => this.props.login(fields)} />
        )}
        <GlobalStyle />
      </div>
    );
  }
}
App.propTypes = {
  globalSettings: PropTypes.object,
  updateGlobalSettingsLoading: PropTypes.bool,
  fetchGlobalSettings: PropTypes.func,
  updateGlobalSettings: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  login: (fields) => dispatch(login(fields))
});

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
  isLoggingIn: makeSelectIsLoggingIn()
});

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withSaga,
  withConnect
)(App);
