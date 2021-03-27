import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import IndexPage2 from './routes/IndexPage2';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/2" exact component={IndexPage2} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
