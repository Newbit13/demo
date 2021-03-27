import React, { useCallback } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage(props) {
  // 使用connect，改变model的值，有依赖的useCallback里的值会随之变化
  const dispatch = props.dispatch;
  const handleLog = useCallback(()=>{
    console.log(props.a.value);
  },[props]);
  const handleAdd = useCallback(()=>{
    dispatch({
      type:'example/add'
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
  return state.example;
})(IndexPage);
