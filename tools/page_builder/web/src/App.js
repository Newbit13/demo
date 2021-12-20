import React from 'react';
import './App.css';
import ToolBar from './component/ToolBar/ToolBar';
import Stage from './component/Stage/Stage';
import EditBar from './component/EditBar/EditBar';


function App() {
  return (
    <div className="App" style={{display:'flex'}}>
      <ToolBar/>
      <Stage />
      <EditBar />
    </div>
  );
}

export default App;
