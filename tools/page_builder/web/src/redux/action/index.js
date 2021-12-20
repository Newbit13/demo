export const addContainer = (props)=>{
    return {
        type:'ADD_NODE',
        payload:{
            ...props
        }
    }
}

// export const addText = (props)=>{
//     return {
//         type:'ADD_TEXT',
//         payload:{
//             ...props
//         }
//     }
// }

export const setCurrentEle = (props)=>{
    return {
        type:'SELECT_ELE',
        payload:{
            ...props
        }
    }
}

export const editCurrentEle = (props)=>{
    return {
        type:'EDIT_CUR_ELE',
        payload:{
            ...props
        }
    }
}

export const editCurrentEleContent = (props)=>{
    return {
        type:'EDIT_CUR_ELE_CONTENT',
        payload:{
            ...props
        }
    }
}

