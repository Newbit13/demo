import React,{useCallback} from 'react';

export default () => {
    const cb = useCallback(()=>{
        console.log(2);
    },[])
    return (
        <div onClick={cb}>
            i am Meet!
        </div>
    )
};