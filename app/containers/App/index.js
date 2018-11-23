import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Login from 'components/Login';
import Header from 'components/Header';
import HomePage from 'containers/HomePage/Loadable';
import GlobalSettings from 'containers/GlobalSettings/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import './style.scss';
import GlobalStyle from './../../styles/global-styles';
import { login } from './actions';
import { makeSelectIsLoggedIn, makeSelectIsLoggingIn } from './selectors';

import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  // state = {
  //   toLogin: false,
  //   toRoutes: true,
  //   toInitalSetup: false
  // };
  // componentDidMount() {
  //   // document.cookies.onChanged.addListener((changeInfo) => {
  //   //   console.log(changeInfo);
  //   // });

  //   const cookie = document.cookie;
  //   console.log(cookie);
  //   if (!cookie) {
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
  //     this.setState({
  //       toLogin: false,
  //       toRoutes: true,
  //       toInitalSetup: false
  //     });
  //   }
  // }
  render() {
    return (
      <div className="app-wrapper">
        <Header />
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

        {/* {this.state.toLogin && (
          <Login onSubmit={(fields) => this.props.login(fields)} />
        )} */}
        <GlobalStyle />
      </div>
    );
  }
}
// App.propTypes = {};

// const mapDispatchToProps = (dispatch) => ({
//   login: (fields) => dispatch(login(fields))
// });

// const mapStateToProps = createStructuredSelector({
//   isLoggedIn: makeSelectIsLoggedIn(),
//   isLoggingIn: makeSelectIsLoggingIn()
// });

// const withReducer = injectReducer({ key: 'app', reducer });
// const withSaga = injectSaga({ key: 'app', saga });

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps
// );

// const AppTemp = compose(
//   withReducer,
//   withSaga,
//   withConnect
// )(App);

// const AppWrapper = () => <AppTemp />;
export default App;
