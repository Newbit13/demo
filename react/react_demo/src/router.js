import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import HookApp from './HookApp'


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HookApp} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
