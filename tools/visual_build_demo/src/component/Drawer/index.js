import {useState,useCallback} from 'react';
import {useSelector,useDispatch} from 'react-redux'

import componentList from '../../componentlist';
import css from './index.module.css';
//业务组件
function Text(props){
    return (
        <div style={props.style}>{props.propV}</div>
    )
}
function Button(props){
    return (
        <button style={props.style}>{props.propV}</button>
    )
}
function Image(props){
    return (
        <img src={props.propV} style={props.style} alt='pic'/>
    )
}
// window.Test = Test;
function transformComp(strV){
    let comp = null;
    switch (strV){
        case 'Text':comp = Text;break;
        case 'Button':comp = Button;break;
        case 'Image':comp = Image;break;
        default:break;
    }
    return comp;
}

function dragOverHandle(e){
    e.preventDefault();
}

function Shape(props){
    const dispatch = useDispatch();
    
    const handleMouseDown = useCallback(function (e) {

        e.stopPropagation()
        dispatch({
            type:'setCurrentIndex',
            index:props.index
        })
    
        // const pos = { ...this.defaultStyle }
        const startY = e.clientY
        const startX = e.clientX
        dispatch({
            type:'updateStartPos',
            pos:{
                startY,
                startX
            }
        })
        // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
        // const startTop = Number(pos.top)
        // const startLeft = Number(pos.left)
    
        const move = (moveEvent) => {
            const currX = moveEvent.clientX
            const currY = moveEvent.clientY
            // 修改当前组件样式
            dispatch({
                type:'updateMovePos',
                pos:{
                    currX,
                    currY
                }
            })
        }
    
        const up = () => {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', up)
        }
    
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
    },[props.index])

    return (
        <div 
            className={css.shape} 
            onMouseDown={handleMouseDown}
        >
            {props.children}
        </div>
    )
}

const leftToolBarWidth = 100;
const TopToolBarHeight = 50;

function Drawer(){
    const [menuIsShow,menuIsShowHandle] = useState(false);
    const [menuPos,updateMenuPos] = useState({top:0,left:0});
    const componentData = useSelector(state => state.MyReducer.renderList);
    const dispatch = useDispatch();

    const dropEndHandle = useCallback(function (e){
        let index = e.dataTransfer.getData('index');
        let compData = componentList[index];
        let copyObj = JSON.parse(JSON.stringify(compData));
        copyObj.key = Date.now();
        
        copyObj.style.top = e.clientY - TopToolBarHeight;
        copyObj.style.left = e.clientX - leftToolBarWidth;

        dispatch({
            type:'AddComp',
            comp:copyObj
        })
        // componentData.push(copyObj);
        // setComponentData([...componentData])
    },[])
    
    const handleContextMenu = useCallback(function (e) {
        e.preventDefault();
        updateMenuPos({
            top:e.clientY - TopToolBarHeight,
            left:e.clientX - leftToolBarWidth,
        })
        menuIsShowHandle(true);
    },[])

    const handleClick = useCallback(function (e) {
        menuIsShowHandle(false);
    },[])

    const handleDownIndex = useCallback(function (e) {
        dispatch({
            type:'downIndex',
        })
    },[])

    const handleDelete = useCallback(function (e) {
        dispatch({
            type:'deleteComp',
        })
    },[])

    return (
        <div 
            onDrop={dropEndHandle} 
            onDragOver={dragOverHandle}
            onDragStart={dragOverHandle}
            draggable="true" 
            onContextMenu={handleContextMenu}
            onClick={handleClick}
            className={css.main}
        >
            <div className={css.menuBox} style={{display:menuIsShow?'block':'none',...menuPos}}>
                <div className={css.menuItem} onClick={handleDownIndex}>下移</div>
                <div className={css.menuItem} onClick={handleDelete}>删除</div>
            </div>
            {componentData.map((item,index)=>{
                let DynamicComp = transformComp(item.component);
                return (
                    <Shape key={item.key} index={index}>
                        <DynamicComp style={item.style} propV={item.propV}/>
                    </Shape>
                )
                // return createElement(window[item.component],{
                //     style: item.style,
                //     key: item.key
                // });
            })}
        </div>
    )
}

export default Drawer;