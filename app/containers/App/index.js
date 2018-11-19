import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import './style.scss';
import GlobalStyle from './../../styles/global-styles';

const App = () => (
  <div className="app-wrapper">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route
        exact
        path="/source/:id/:tab(stats|files|archives)?/:subTab(size|messages)?"
        component={HomePage}
      />
      <Route path="" component={NotFoundPage} />
    </Switch>
    <GlobalStyle />
  </div>
);

export default App;
