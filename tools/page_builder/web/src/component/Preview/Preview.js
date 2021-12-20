import React from 'react';

function Preview(props) {
    const {ele,level} = props
    const lv = level + 1;
    const Tag = ele.eleName;
    const content = ele.content;
    const children = ele.children;
    const style = ele.style;
    return (
        <Tag style={style}>
            {
                Array.isArray(children)?
                children.map((element,i)=>{
                    return (
                        <Preview key={'TipWrap_'+lv+'_'+i} ele={element}></Preview>
                    )
                })
                :
                children
            }
            {content}
        </Tag>
    );
}

export default Preview;
