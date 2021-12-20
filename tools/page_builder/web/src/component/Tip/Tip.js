import React from 'react';
import {connect} from 'react-redux'

import {setCurrentEle} from '../../redux/action/index'

function Tip(props) {
    const {type,children,currentEle,setCurrentEle} = props
    const isCheck = type === currentEle
    return (
        <div 
            style={
                {
                    border:'1px dashed',
                    borderColor:isCheck?'#f00':'#ccc',
                    position:'relative',
                    cursor:'pointer',
                    paddingLeft:'21px',
                    zIndex:isCheck?1:0
                }
            }
            onClick={(e)=>{
                setCurrentEle({ele:type});
                e.stopPropagation();
            }}
        >
            <div style={
                {
                    position:'absolute',
                    top:0,
                    left:0,
                    color:'#fff',
                    backgroundColor:isCheck?'#f00':'#ccc',
                    padding:'2px',
                    fontSize:'12px',
                    borderBottomLeftRadius:'10px',
                    borderTopLeftRadius:'10px',
                }
            }>
                {type.eleName}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

const ConnectTip = connect(
    (state)=>{
        return {
            currentEle:state.metaData_reducer.currentEle
        }
    },
    {
        setCurrentEle
    }
)(Tip)

export default ConnectTip;
