import React, { useCallback } from "react";

import { observer } from "mobx-react";
import { useStores } from "../../store";

const BFn = observer(() => {
  const { counter } = useStores();
  // console.log(counter);
  const add = useCallback(() => {
    console.log("add");
    counter.add();
  }, []);
  const addObj = useCallback(() => {
    console.log("addObj");
    counter.addObj();
  }, []);
  return (
    <div>
      <div>{counter.count}</div>
      <div>{counter.countObj.val}</div>
      <button onClick={add}>add</button>
      <button onClick={addObj}>addObj</button>
    </div>
  );
});

export default BFn;
