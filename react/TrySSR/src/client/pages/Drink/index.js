import React,{useCallback,useState,useEffect} from 'react';
import axios from 'axios';

import {envInitialData} from '../../util'
import styles from './style.css'
// import './style.css'
// console.log(styles['locals']);
// const zz = styles['locals'] || styles//服务端跟客户端的styles格式不一样
const Index = (prop) => {
    const [msg,setMsg] = useState(envInitialData(prop));
    const cb = useCallback(async ()=>{
        const data = await Index.preFetch()
        setMsg(data);
    },[])
    useEffect(()=>{
        if(msg == 'sss3'){
            Index.preFetch().then(function(data){
                setMsg(data);
            })
        }
    },[])
    return (
        <div>
            <button onClick={cb}>i am Drink!</button>
            <p className={styles.drink_p}>{msg}</p>
            {/* <p className="drink_p">{msg}</p> */}
        </div>
    )
};
Index.preFetch = async ()=>{
    const res = await axios.get('http://localhost:9999/testdata')
    return res.data.data;
}

export default Index