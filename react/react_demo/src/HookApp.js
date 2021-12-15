import React, { useCallback, useEffect } from "react";
// import { connect } from 'dva';

// function IndexPage(props) {
//   // 使用connect，改变model的值，有依赖的useCallback里的值会随之变化
//   const dispatch = props.dispatch;
//   const handleLog = useCallback(()=>{
//     console.log(props.a.value);
//   },[props]);
//   const handleAdd = useCallback(()=>{
//     dispatch({
//       type:'example/add'
//     })
//   },[]);
//   return (
//     <div>
//       <button onClick={handleAdd}>click</button>
//       <button onClick={handleLog}>log</button>
//       <div>{props.a.value}</div>
//     </div>
//   );
// }

// export default connect(state=>{
//   return state.example;
// })(IndexPage);

import { useSelector, useDispatch } from "dva";
import { useState } from "react";
// import {  useSelector } from 'react-redux';
function useTime() {
  const [time, setT] = useState(0);
  useEffect(() => {
    let t = setInterval(() => {
      setT(time + 1);
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, [time]);
  return time;
}
function IndexPage(props) {
  const time = useTime();
  const dispatch = useDispatch();
  const { data1, data2 } = useSelector((data) => {
    return {
      data1: data.example,
      data2: data.example2,
    };
  });
  const v = data1.a.value;
  const handleLog = useCallback(
    (id) => {
      console.log(id);
      console.log(v);
    },
    [data1]
  );
  console.log(v);
  const handleAdd = useCallback(() => {
    dispatch({
      type: "example/add",
    });
  }, []);
  return (
    <div>
      <button onClick={handleAdd}>click</button>
      <button onClick={handleLog.bind(this, 777)}>log</button>
      <div>{data1.a.value}</div>
      <div>{time}</div>
    </div>
  );
}

export default IndexPage;
