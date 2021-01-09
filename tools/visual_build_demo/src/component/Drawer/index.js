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
const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb'];
const directionKey = {
    t:'n',
    b:'s',
    r:'e',
    l:'w',
}
function getPointStyle(point,defaultStyle) {
    const { width, height } = defaultStyle
    const hasT = /t/.test(point)
    const hasB = /b/.test(point)
    const hasL = /l/.test(point)
    const hasR = /r/.test(point)
    let newLeft = 0
    let newTop = 0

    // 四个角的点
    if (point.length === 2) {
        newLeft = hasL? 0 : width
        newTop = hasT? 0 : height
    } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
            newLeft = width / 2
            newTop = hasT? 0 : height
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
            newLeft = hasL? 0 : width
            newTop = Math.floor(height / 2)
        }
    }

    const style = {
        marginLeft: hasR? '-4px' : '-3px',
        marginTop: '-3px',
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: point.split('').reverse().map(m => directionKey[m]).join('') + '-resize',
    }

    return style
}

function Shape(props){
    const dispatch = useDispatch();
    const currentIndex = useSelector(state => state.MyReducer.currentIndex);
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

    const handleMouseDownOnPoint = useCallback(function (e,point,defaultStyle) {
        const event = e;
        event.stopPropagation()
        event.preventDefault()


        const pos = {...defaultStyle}
        const height = Number(pos.height)
        const width = Number(pos.width)
        const top = Number(pos.top)
        const left = Number(pos.left)
        const startX = event.clientX
        const startY = event.clientY 
    
        // 是否需要保存快照
        let needSave = false
        const move = (moveEvent) => {
            needSave = true
            const currX = moveEvent.clientX
            const currY = moveEvent.clientY
            const disY = currY - startY
            const disX = currX - startX
            const hasT = /t/.test(point)
            const hasB = /b/.test(point)
            const hasL = /l/.test(point)
            const hasR = /r/.test(point)
            const newHeight = height + (hasT? -disY : hasB? disY : 0)
            const newWidth = width + (hasL? -disX : hasR? disX : 0)
            pos.height = newHeight > 0? newHeight : 0
            pos.width = newWidth > 0? newWidth : 0
            pos.left = left + (hasL? disX : 0)
            pos.top = top + (hasT? disY : 0)
            // console.log(pos);
            dispatch({
                type:'updateStyle',
                pos:pos
            })
            // this.$store.commit('setShapeStyle', pos)
        }
    
        const up = () => {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', up)
            needSave && (
                dispatch({
                    type:'save'
                })
            )
        }
    
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
    },[])

    return (
        <div 
            className={[css.shape,(currentIndex === props.index?css.active:null)].join(' ')}
            onMouseDown={handleMouseDown}
            style={props.style}
        >
            {(currentIndex === props.index && props.havePoint) && pointList.map((point,index)=>{
                return (
                    <div
                        className={css.shapePoint}
                        onMouseDown={(e)=>handleMouseDownOnPoint(e,point,props.style)}
                        key={index}
                        style={getPointStyle(point,props.style)}>
                    </div>
                )
            })}
            
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
    // console.log(useSelector(state => state.MyReducer));
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
        dispatch({
            type:'save'
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

    const handleSDownIndex = useCallback(function (e) {
        dispatch({
            type:'sdownIndex',
        })
    },[])

    const handleUpIndex = useCallback(function (e) {
        dispatch({
            type:'upIndex',
        })
    },[])

    const handleSUpIndex = useCallback(function (e) {
        dispatch({
            type:'supIndex',
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
                <div className={css.menuItem} onClick={handleSDownIndex}>置底</div>
                <div className={css.menuItem} onClick={handleDownIndex}>下移</div>
                <div className={css.menuItem} onClick={handleSUpIndex}>置顶</div>
                <div className={css.menuItem} onClick={handleUpIndex}>上移</div>
                <div className={css.menuItem} onClick={handleDelete}>删除</div>
            </div>
            {componentData.map((item,index)=>{
                let DynamicComp = transformComp(item.component);
                return (
                    <Shape key={item.key} index={index} style={item.style} havePoint={item.havePoint}>
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