import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';//异步加载
// import FnVsClass from './FnVsClass'//体验class组件跟fn组件的魅力&区别
import SuperFn from './SuperFn'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <FnVsClass /> */}
    <SuperFn />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
