import React, { useCallback, useEffect, useMemo } from "react";
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
import { useRef } from "react";
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

let ff;
function useMemoizedFn(fn) {
  const fnRef = useRef(fn);
  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);
  console.log("ff == fnRef.current");
  console.log(ff == fnRef.current);
  ff = fnRef.current;

  const memoizedFn = useRef();
  // console.log(memoizedFn);
  if (!memoizedFn.current) {
    memoizedFn.current = function (...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current;
}

let f;
function IndexPage(props) {
  // const time = useTime();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log("effect");
  // }, []);
  // useEffect(() => {
  //   console.log("effect");
  // });
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
  // console.log(v);
  const handleAdd = useCallback(() => {
    dispatch({
      type: "example/add",
    });
  }, []);

  // const fn = useCallback(() => {
  //   console.log(data1.a.value);
  // }, []);

  const fn = useMemoizedFn(() => {
    console.log(data1.a.value);
  })

  // const fn = () => {
  //   console.log(data1.a.value);
  // };

  useEffect(() => {
    console.log("effect");
    f = fn;
  }, []);

  console.log("fn是否是原来的fn");
  console.log(f === fn);

  return (
    <div>
      <button onClick={handleAdd}>click</button>
      <button onClick={handleLog.bind(this, 777)}>log</button>
      <div>{data1.a.value}</div>
      {/* <div>{time}</div> */}

      <button onClick={fn}>click</button>
    </div>
  );
}

export default IndexPage;
