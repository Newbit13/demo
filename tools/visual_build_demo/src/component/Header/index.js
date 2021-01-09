import {useCallback} from 'react';
import {useSelector,useDispatch} from 'react-redux'

import css from './index.module.css';
function Header(){
    const MyReducer = useSelector(state => state.MyReducer);
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

    const debug = useCallback(function(){
        console.log(MyReducer);
    },[MyReducer])

    return (
        <div className={css.header}>
            <div className={css.btn} onClick={undo}>撤销</div>
            <div className={css.btn} onClick={redo}>重做</div>
            <div className={css.btn} onClick={debug}>Test</div>
        </div>
    );
}

export default Header