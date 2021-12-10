import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import AClass from "./pages/AClass";
import BFn from "./pages/BFn";
import BFn2 from "./pages/BFn2";

function App() {
  const [count, setCount] = useState(0);
  console.log("App");
  return (
    <div className="App">
      <AClass />
      <BFn />
      <BFn2 />
    </div>
  );
}

export default App;
