import React,{useState} from 'react';
import {connect} from 'react-redux'

import {setCurrentEle} from '../../redux/action/index'

import css from './Stage.module.scss'//xx.module.scss  用约定命名的方式启用css-module，而不用去改webpack配置
import TipWrap from '../TipWrap/TipWrap';
import Preview from '../Preview/Preview';

function Stage(props) {
    // console.log(props);
    const {metadata,setCurrentEle} = props;
    const [isPreViewShow,ShowPreView] = useState(false);
    const level = 1;
    function showPreView(){
        ShowPreView(!isPreViewShow);
    }

    return (
        <div className={css.stage_container}>
            {
                isPreViewShow && 
                <div style={{position:'fixed',top:0,left:0,bottom:0,right:0,backgroundColor:'#fff',zIndex:2}}>
                    <div 
                        className="header" 
                        style={{textAlign:'center',padding:'10px',backgroundColor:'#1890ff',color:'#fff'}}
                    >
                        <span>预览区</span>
                        <div 
                            className="icon"
                            style={{
                                float:'right'
                            }}
                            onClick={showPreView}
                        >
                            👁
                        </div>
                    </div>
                    {
                        metadata.map((element,i) => {
                            return (
                                <Preview key={'TipWrap_'+level+'_'+i} level={level} ele={element} />
                            );
                        })
                    }
                </div>
            }
            <div 
                className="header" 
                style={{textAlign:'center',padding:'10px',backgroundColor:'#1890ff',color:'#fff'}}
            >
                <span>编辑区</span>
                <div 
                    className="icon"
                    style={{
                        float:'right'
                    }}
                    onClick={showPreView}
                >
                    👁
                </div>
            </div>
            <div 
                style={{
                    minHeight: '680px'
                }}
                onClick={(e)=>{
                    setCurrentEle({ele:null})
                    e.stopPropagation();
                }}
            >
                {metadata.map((element,i) => {
                    return (
                        <TipWrap key={'TipWrap_'+level+'_'+i} level={level} ele={element} />
                    );
                })}
            </div>
        </div>
    )
}



const ConnectStage = connect(
    function(state,ownProps){
        return {
            metadata:state.metaData_reducer.nodeList
        }
    },
    {
        setCurrentEle
    }
)(Stage)

export default ConnectStage;
