import React from 'react';
import {connect} from 'react-redux'

import {addContainer} from '../../redux/action'
import css from './ToolBar.module.scss';

// import bc from '../../static/bc.jpg'
import z from '../../static/z.jpg'

function ToolBar(props) {
    // console.log(props);
    const {addContainer} = props;
    return (
        <div className={css.toolBar}>
            <div className={css.tool_bar_title}>工具栏</div>
            <h5 style={{padding:'10px'}}>布局</h5>
            <div className={css.btn_grounp}>
                <EditBtn 
                    btnText="+容器"
                    clickFn={()=>{
                        addContainer({
                            eleName:'div',
                            // children:null,
                            style:{
                                height:'100px',
                                backgroundImage:`url(${z})`,
                                backgroundSize:'contain',
                                backgroundPosition:'center'
                            }
                        })
                    }}
                />
                <EditBtn 
                    btnText="+段落"
                    clickFn={()=>{
                        addContainer({
                            eleName:'p',
                            // style:{
                                // height:'100px',
                            // }
                        })
                    }}
                />
            </div>
        </div>
    )
}

function EditBtn(props){
    const {clickFn,btnText} = props;
    return (
        <div>
            <div 
                className={css.btn} 
                onClick={clickFn}
            >
                {btnText}
            </div>
        </div>
    )
}

const ConnectToolBar = connect(
    ()=>({}),
    {
        addContainer,
        // addText
    }
)(ToolBar)

export default ConnectToolBar;
