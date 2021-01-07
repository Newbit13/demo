import {useState,useCallback} from 'react';

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
function Drawer(){
    const [componentData,setComponentData] = useState([]);
    const dropEndHandle = useCallback(function (e){
        let index = e.dataTransfer.getData('index');
        let compData = componentList[index];
        let copyObj = JSON.parse(JSON.stringify(compData));
        copyObj.key = Date.now();
        componentData.push(copyObj);
        setComponentData([...componentData])
    },[])
    
    return (
        <div 
            onDrop={dropEndHandle} 
            onDragOver={dragOverHandle}
            onDragStart={dragOverHandle}
            draggable="true" 
            className={css.main}
        >
            {componentData.map((item,index)=>{
                let DynamicComp = transformComp(item.component);
                return <DynamicComp key={item.key} style={item.style} propV={item.propV}/>;
                // return createElement(window[item.component],{
                //     style: item.style,
                //     key: item.key
                // });
            })}
        </div>
    )
}

export default Drawer;