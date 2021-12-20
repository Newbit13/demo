// import produce from 'immer';

const defaultStyleObj = {
    width:'auto',
    height:'auto',
    color:'#000',
    backgroundColor:'#fff',
    backgroundImage:'none',
    fontSize:'12px',
    borderRadius:'0px',
    borderWidth:'0px',
    borderColor:'#000',
    borderStyle:'solid',
    lineHeight:'1.5',
    textAlign:'left',
    margin:'0px',
    padding:'0px'
}

const metaData_reducer = (state = {currentEle:null,nodeList:[]},action) =>{
    let children,style,eleName
    if(action.payload){
        children = action.payload.children;
        style = action.payload.style;
        eleName = action.payload.eleName;
    }
    switch (action.type){
        case 'ADD_NODE':
            const node = {
                eleName,
                className:'container_div',
                children:children || [],
                content:'',
                style:{
                    ...defaultStyleObj,
                    ...style
                }
            }
            if(state.currentEle){
                Array.isArray(state.currentEle.children) &&
                state.currentEle.children.push(node)
            }else{
                state.nodeList.push(node)
            }
            return {
                ...state,
                nodeList:[...state.nodeList]
            };
        //todo这个addText不应该是增加p标签
        // case 'ADD_TEXT':
        //     if(state.currentEle){
        //         Array.isArray(state.currentEle.children) &&
        //         state.currentEle.children.push({
        //             eleName:'p',
        //             className:'container_div',
        //             children:children || "文本",
        //             style:{
        //                 ...defaultStyleObj,
        //                 ...style
        //             }
        //         })
        //     }else{
        //         state.nodeList.push({
        //             eleName:'p',
        //             className:'container_div',
        //             children:children || "文本",
        //             style:{
        //                 ...defaultStyleObj,
        //                 ...style
        //             }
        //         })
        //     }
        //     return {
        //         ...state,
        //         nodeList:[...state.nodeList]
        //     };
            
        case 'SELECT_ELE':
                const {ele} = action.payload;
                state.currentEle = ele;
                return {
                    ...state
                }
        case 'EDIT_CUR_ELE':
            const {styleName,styleValue} = action.payload;
            if(state.currentEle){
                // state.currentEle.style[styleName] = styleValue
                state.currentEle.style = {
                    ...state.currentEle.style,
                    [styleName] : styleValue
                }
            }
            return {
                ...state,
                nodeList:[...state.nodeList]
            };
        case 'EDIT_CUR_ELE_CONTENT':
            const {content} = action.payload;
            if(state.currentEle){
                // state.currentEle.style[styleName] = styleValue
                state.currentEle.content = content;
            }
            return {
                ...state,
                nodeList:[...state.nodeList]
            };
        default:return state
    }
}

// const metaData_reducer = (state = {currentEle:null,nodeList:[]},action) =>{
//     return produce(state, draft => {
//         switch (action.type){
//             case 'ADD_CONTAINER':
//                 const {children,style} = action.payload;
//                 if(state.currentEle){
//                     //todo
//                     draft.currentEle.children.push({
//                         eleName:'div',
//                         className:'container_div',
//                         children:children || [],
//                         style:style || {}
//                     })
//                 }else{
//                     draft.nodeList.push({
//                         eleName:'div',
//                         className:'container_div',
//                         children:children || [],
//                         style:style || {}
//                     })
//                 }
//                 break;
//             case 'SELECT_ELE':
//                 const {ele} = action.payload;
//                 draft.currentEle = ele;
//                 break;
//         }
//     })
    
// }
export default metaData_reducer

