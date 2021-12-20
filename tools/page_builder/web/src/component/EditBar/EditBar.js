import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux'

import {editCurrentEle,editCurrentEleContent} from '../../redux/action'

const styleObjText = {
    width:'宽',
    height:'高',
    color:'字体颜色',
    backgroundColor:'背景颜色',
    backgroundImage:'背景图片',
    fontSize:'字体大小',
    borderRadius:'边框圆角',
    borderWidth:'边框宽度',
    borderColor:'边框颜色',
    borderStyle:'边框样式',
    lineHeight:'行高',
    textAlign:'文本对齐方式',
    margin:'外边距',
    padding:'内边距'
}

function EditBar(props) {
    const {currentEle,editCurrentEle,editCurrentEleContent} = props;
    if(!currentEle){
        return (
            <div style={{
                minWidth:'300px'
            }}>
            </div>
        )
    }

    function changeValue(key){
        return (e)=>{
            editCurrentEle({
                styleName:key,
                styleValue:e.target.value
            })
        }
    }
    var eleEditList = [];

    for(var key in currentEle.style){
        eleEditList.push(
            <EditInput 
                key={key}
                labelName={styleObjText[key] || key}
                value={currentEle.style[key]}
                currentEle={currentEle}
                changeValueFn={changeValue(key)}
            />
        )
    }
    
    function changeContent(e){
        editCurrentEleContent({
            content:e.target.value
        })
    }

    return (
        <div style={{
            minWidth:'300px',
            padding:'5px',
            position:'relative'
        }}>
            <div style={{
                position:'fixed',
                top:0
            }}>
                {eleEditList}
                <hr/>
                <EditInput 
                    labelName="内容文本"
                    value={currentEle.content}
                    currentEle={currentEle}
                    changeValueFn={changeContent}
                />
            </div>
            
        </div>
    )
}

function EditInput(props){
    let {labelName,value,currentEle,changeValueFn} = props;
    
    const [inputV,setInputV] = useState(value);

    useEffect(()=>{
        setInputV(value);
    },[currentEle,value])//为了切换当前节点后input内容会变化,value可以不加的，但是会warn

    function changeFn(e){
        setInputV(e.target.value);
        changeValueFn(e)
    }

    return (
        <div>
            <label style={{
                width:'98px',
                display:'inline-block',
                textAlign:'right',
                marginRight:'5px'
            }}>
                {labelName}
            </label>
            <input type="text" value={inputV} onChange={changeFn}/>
        </div>
    )
}

const ConnectEditBar = connect(
    (state)=>{
        return {
            currentEle:state.metaData_reducer.currentEle
        }
    },
    {
        editCurrentEle,
        editCurrentEleContent
    }
)(EditBar)

export default ConnectEditBar;
