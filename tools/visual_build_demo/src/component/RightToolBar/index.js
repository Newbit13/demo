import css from './index.module.css';
import {useSelector,useDispatch} from 'react-redux'

function bindHandler(styleKey,dispatch){
    return (v)=>{
        let styleObj = {
            [styleKey]:/^\d*$/.test(v.target.value)?v.target.value*1:v.target.value
        }
        dispatch({
            type:'updateStyle',
            pos:styleObj
        })
    }
}
function bindHandlerByProp(keyName,dispatch){
    return (v)=>{
        let propObj = {
            [keyName]:/^\d*$/.test(v.target.value)?v.target.value*1:v.target.value
        }
        dispatch({
            type:'updateProp',
            pos:propObj
        })
    }
}

function Comp(){
    const dispatch = useDispatch();
    const {currentIndex,renderList} = useSelector(state => state.MyReducer);
    const curComp = renderList[currentIndex]
    if(!curComp)return null;
    let styleList = [];
    for(var k in curComp.style){
        styleList.push([k,curComp.style[k]]);
    }
    let propList = [];
    for(var kk in curComp.propV){
        propList.push([kk,curComp.propV[kk]]);
    }
    return (
        <div className={css.rightBar}>
            {styleList.map(v=>{
                return (
                    <div style={{marginBottom:'10px'}} key={v[0]}>
                        <label>
                            <p style={{width:'20px'}}>
                                {v[0]}
                            </p>
                            <input 
                                style={{width:'50px'}}
                                type={v[0] === "color"?"color":"text"} 
                                value={v[1]}
                                onChange={bindHandler(v[0],dispatch)}
                            />
                        </label>
                    </div>
                )
            })}
            {propList.map(v=>{
                return (
                    <div style={{marginBottom:'10px'}} key={v[0]}>
                        <label>
                            <p style={{width:'20px'}}>
                                {v[0]}
                            </p>
                            <input 
                                style={{width:'50px'}}
                                type={v[0] === "color"?"color":"text"} 
                                value={v[1]}
                                onChange={bindHandlerByProp(v[0],dispatch)}
                            />
                        </label>
                    </div>
                )
            })}
        </div>
    );
}

export default Comp