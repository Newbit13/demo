import React, { useCallback } from 'react';
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

import { useSelector,useDispatch } from 'dva';
// import {  useSelector } from 'react-redux';
function IndexPage(props) {
  const dispatch = useDispatch();
  const {data1,data2} = useSelector(data=>{
    return {
      data1:data.example,
      data2:data.example2,
    }
  });
  const handleLog = useCallback(()=>{
    console.log(data1.a.value);
  },[data1]);
  const handleAdd = useCallback(()=>{
    dispatch({
      type:'example/add'
    })
  },[]);
  return (
    <div>
      <button onClick={handleAdd}>click</button>
      <button onClick={handleLog}>log</button>
      <div>{data1.a.value}</div>
    </div>
  );
}

export default IndexPage;
