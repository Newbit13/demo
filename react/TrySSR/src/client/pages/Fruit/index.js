import React,{useCallback,useState} from 'react';
// import styles from './style.css';
import './style.css';
// console.log(styles);
export default () => {
    let [count,setCount] = useState(0);
    const cb = useCallback(()=>{
        setCount(++count);
    },[])
    return (
        <div>
            <button  onClick={cb}> i am fruit!</button>
            {/* <p className={styles.fruit_p}>{count}</p> */}
            <p className="fruit_p">{count}</p>
        </div>
    )
};