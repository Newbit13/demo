import React, { useCallback,useReducer } from 'react';
// import { connect,useSelector } from 'dva';
import { connect } from 'react-redux'
import styles from './IndexPage.css';
console.log(connect);
function IndexPage(props) {
  // const data = useSelector(data=>data.example);
  // console.log(data);
  const handleLog = useCallback(()=>{
    // console.log(props.a.value);
  },[props]);
  const handleAdd = useCallback(()=>{
    // dispatch({
    //   type:'example/add'
    // })
  },[]);
  return (
    <div className={styles.normal}>
      <button onClick={handleAdd}>click</button>
      <button onClick={handleLog}>log</button>
      {/* <div>{props.a.value}</div> */}
    </div>
  );
}


export default IndexPage
