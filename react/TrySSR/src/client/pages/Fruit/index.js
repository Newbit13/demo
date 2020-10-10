import React,{useCallback} from 'react';

export default () => {
    const cb = useCallback(()=>{
        console.log(1);
    },[])
    return (
        <div onClick={cb}>
            i am fruit!
        </div>
    )
};