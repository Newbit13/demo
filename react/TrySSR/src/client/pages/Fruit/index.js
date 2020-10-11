import React,{useCallback,useState} from 'react';

export default () => {
    let [count,setCount] = useState(0);
    const cb = useCallback(()=>{
        setCount(++count);
    },[])
    return (
        <div>
            <button  onClick={cb}> i am fruit!</button>
            <p>{count}</p>
        </div>
    )
};