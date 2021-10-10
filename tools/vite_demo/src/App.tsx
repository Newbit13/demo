import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  color: blue;
  .haha {
    width: 100%;
    height: 200px;
    background: #e37e7e;
  }
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <Wrapper>
      <div className="haha"></div>
    </Wrapper>
  );
}

export default App;
