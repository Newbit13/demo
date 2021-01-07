import Drawer from './component/Drawer/';
import Header from './component/Header';
import LeftToolBar from './component/LeftToolBar';
import './static/css/index.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <LeftToolBar />
        <Drawer />
      </div>
    </div>
  );
}

export default App;
