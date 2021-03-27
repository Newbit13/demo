import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
// import App from './App';//异步加载
// import FnVsClass from './FnVsClass'//体验class组件跟fn组件的魅力&区别
// import SuperFn from './SuperFn'
import HookApp from './HookApp'

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <FnVsClass /> */}
    {/* <SuperFn /> */}
    <HookApp />
  </React.StrictMode>,
  document.getElementById('root')
);
