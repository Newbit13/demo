import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

// import Login from "./containers/login/login";
import Regist from "./containers/register/register";
// import Main from "./containers/main/main";
import store from "./redux/store";
// store
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/app" component={App} />
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/register" component={Regist} />
        {/* <Route component={Main} /> */}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
