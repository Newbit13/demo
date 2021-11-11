import React, { useCallback } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage(props) {
  console.log("IndexPage2");
  const dispatch = props.dispatch;
  const handleLog = useCallback(()=>{
    console.log(props.a.value);
  },[props]);
  const handleAdd = useCallback(()=>{
    dispatch({
      type:'example2/add'
    })
  },[]);
  return (
    <div className={styles.normal}>
      <button onClick={handleAdd}>click</button>
      <button onClick={handleLog}>log</button>
      <div>{props.a.value}</div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(state=>{
  return state.example2;
})(IndexPage);
