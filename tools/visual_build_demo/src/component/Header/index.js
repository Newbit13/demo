import {useCallback} from 'react';
import {useDispatch} from 'react-redux'

import css from './index.module.css';
function Header(){
    const dispatch = useDispatch();
    const undo = useCallback(function(){
        dispatch({
            type:'undo',
        })
    },[])

    const redo = useCallback(function(){
        dispatch({
            type:'redo',
        })
    },[])

    return (
        <div className={css.header}>
            <div className={css.btn} onClick={undo}>撤销</div>
            <div className={css.btn} onClick={redo}>重做</div>
        </div>
    );
}

export default Header