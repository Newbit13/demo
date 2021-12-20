import React from 'react';
import ConnectTip from '../Tip/Tip';

function TipWrap(props) {
    const {ele,level} = props
    const lv = level + 1;
    const Tag = ele.eleName;
    const content = ele.content;
    const children = ele.children;
    const style = ele.style;
    return (
        <ConnectTip type={ele}>
            <Tag style={style}>
                {
                    Array.isArray(children)?
                    children.map((element,i)=>{
                        return (
                            <TipWrap key={'TipWrap_'+lv+'_'+i} ele={element}></TipWrap>
                        )
                    })
                    :
                    children
                }
                {content}
            </Tag>
        </ConnectTip>
    );
}

export default TipWrap;
