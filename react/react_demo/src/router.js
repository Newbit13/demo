import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import HookApp from './HookApp'
import TestUseMemoizedFn from './issue/useMemoizedFnDemo'


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={TestUseMemoizedFn} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
