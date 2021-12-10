import React, { useCallback } from "react";

// import { useStores } from "../../store";
import { inject, observer } from "mobx-react";

function BFn({counter}) {
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
}

export default inject("counter")(observer(BFn));
