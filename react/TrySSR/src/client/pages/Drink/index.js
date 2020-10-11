import React,{useCallback} from 'react';

export default () => {
    const cb = useCallback(()=>{
        console.log(3);
    },[])
    return (
        <div onClick={cb}>
            i am Drink!
        </div>
    )
};