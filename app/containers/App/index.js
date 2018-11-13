import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
