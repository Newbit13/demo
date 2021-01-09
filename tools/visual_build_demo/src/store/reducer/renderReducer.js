const initialState = {
    currentIndex:0,
    renderList:[],
    startX:0,
    startY:0,
    startTop:0,
    startLeft:0,
    snapShopList:[],
    snapShopIndex:0,

    auxiliary:{
        auxiliary_line_top:50,
        auxiliary_line_left:50,
        auxiliary_horizontal_line:false,
        auxiliary_vertical_line:false,
    }
}

function MyReducer(state = initialState,action){
    let currentComp;
    let temp;
    let index;
    let newList;
    let tempObj;
    // console.log(action.type);
    switch (action.type){
        case 'AddComp':
            newList = [...state.renderList];
            newList.push(action.comp);
            return {
                ...state,
                renderList:newList,
                currentIndex:state.renderList.length
            };
        case 'setCurrentIndex':
            state.currentIndex = action.index;
            return {
                ...state
            };
        case 'updateStartPos':
            currentComp = state.renderList[state.currentIndex];
            return {
                ...state,
                startX:action.pos.startX,
                startY:action.pos.startY,
                startTop:currentComp.style.top,
                startLeft:currentComp.style.left
            };
        case 'updateMovePos':
            currentComp = state.renderList[state.currentIndex];

            tempObj = {
                ...currentComp
            }
            tempObj.style = {
                ...currentComp.style,
                top: action.pos.currY - state.startY + state.startTop,
                left: action.pos.currX - state.startX + state.startLeft
            }
            state.renderList[state.currentIndex] = tempObj
            currentComp = tempObj

            // 辅助线判断逻辑
            let haveMatch_vertical = false;
            let haveMatch_horizontal = false;
            let vertical_diration = (action.pos.currY - state.startY)>0?'down':'up';
            let horizontal_diration = (action.pos.currX - state.startX)>0?'right':'left';
            let diffV = 3;
            state.renderList.forEach((comp,index)=>{
                if(index === state.currentIndex)return

                let targetHalf = comp.style.left + comp.style.width/2;
                if(horizontal_diration === 'left'){
                    let compLeft = comp.style.left + comp.style.width;
                    if(currentComp.style.left >= compLeft - diffV && currentComp.style.left <= compLeft + diffV){
                        haveMatch_vertical = true;
                        currentComp.style.left = compLeft;
                    }else if(currentComp.style.left >= targetHalf - diffV && currentComp.style.left <= targetHalf + diffV){
                        haveMatch_vertical = true;
                        currentComp.style.left = targetHalf;
                    }else if(currentComp.style.left >= comp.style.left - diffV && currentComp.style.left <= comp.style.left + diffV){
                        haveMatch_vertical = true;
                        currentComp.style.left = comp.style.left;
                    }
                    if(haveMatch_vertical){
                        state.auxiliary.auxiliary_line_left = currentComp.style.left;
                    }
                }else if(horizontal_diration === 'right'){
                    let compRight = currentComp.style.left + currentComp.style.width;
                    let compRight2 = comp.style.left + comp.style.width;

                    if(compRight >= comp.style.left - diffV && compRight <= comp.style.left + diffV){
                        haveMatch_vertical = true;
                        currentComp.style.left = comp.style.left - currentComp.style.width;
                        state.auxiliary.auxiliary_line_left = comp.style.left;
                    }else if(compRight >= targetHalf - diffV && compRight <= targetHalf + diffV){
                        haveMatch_vertical = true;
                        currentComp.style.left = targetHalf - currentComp.style.width;
                        state.auxiliary.auxiliary_line_left = targetHalf;
                    }else if(compRight >= compRight2 - diffV && compRight <= compRight2 + diffV){
                        haveMatch_vertical = true;
                        currentComp.style.left = compRight2 - currentComp.style.width;
                        state.auxiliary.auxiliary_line_left = compRight2;
                    }
                }

                let targetHalf2 = comp.style.top + comp.style.height/2;
                if(vertical_diration === 'up'){
                    let compTop = comp.style.top + comp.style.height;
                    if(currentComp.style.top >= compTop - diffV && currentComp.style.top <= compTop + diffV){
                        haveMatch_horizontal = true;
                        currentComp.style.top = compTop;
                    }else if(currentComp.style.top >= targetHalf2 - diffV && currentComp.style.top <= targetHalf2 + diffV){
                        haveMatch_horizontal = true;
                        currentComp.style.top = targetHalf2;
                    }else if(currentComp.style.top >= comp.style.top - diffV && currentComp.style.top <= comp.style.top + diffV){
                        haveMatch_horizontal = true;
                        currentComp.style.top = comp.style.top;
                    }
                    if(haveMatch_horizontal){
                        state.auxiliary.auxiliary_line_top = currentComp.style.top;
                    }
                }else if(vertical_diration === 'down'){
                    let compTop = currentComp.style.top + currentComp.style.height;
                    let compTop2 = comp.style.top + comp.style.height;

                    if(compTop >= comp.style.top - diffV && compTop <= comp.style.top + diffV){
                        haveMatch_horizontal = true;
                        currentComp.style.top = comp.style.top - currentComp.style.height;
                        state.auxiliary.auxiliary_line_top = comp.style.top;
                    }else if(compTop >= targetHalf2 - diffV && compTop <= targetHalf2 + diffV){
                        haveMatch_horizontal = true;
                        currentComp.style.top = targetHalf2 - currentComp.style.height;
                        state.auxiliary.auxiliary_line_top = targetHalf2;
                    }else if(compTop >= compTop2 - diffV && compTop <= compTop2 + diffV){
                        haveMatch_horizontal = true;
                        currentComp.style.top = compTop2 - currentComp.style.height;
                        state.auxiliary.auxiliary_line_top = compTop2;
                    }
                }
                
            })
            if(haveMatch_vertical){
                state.auxiliary.auxiliary_vertical_line = true;
            }else{
                state.auxiliary.auxiliary_vertical_line = false;
            }
            if(haveMatch_horizontal){
                state.auxiliary.auxiliary_horizontal_line = true;
            }else{
                state.auxiliary.auxiliary_horizontal_line = false;
            }
            

            return {
                ...state,
                renderList:[...state.renderList]
            };
        case 'downIndex':
            if(state.currentIndex === 0){
                return {
                    ...state
                }
            }
            currentComp = state.renderList[state.currentIndex];
            temp = state.renderList[state.currentIndex - 1];
            state.renderList[state.currentIndex - 1] = currentComp;
            state.renderList[state.currentIndex] = temp;
            return {
                ...state,
                renderList:[...state.renderList],
                currentIndex: state.currentIndex - 1
            };
        case 'sdownIndex':
            if(state.currentIndex === 0){
                return {
                    ...state
                }
            }
            currentComp = state.renderList.splice(state.currentIndex,1);
            newList = [...state.renderList];
            newList.unshift(currentComp[0])
            return {
                ...state,
                renderList:newList,
                currentIndex: 0
            };
        case 'upIndex':
            if(state.currentIndex === state.renderList.length - 1){
                return {
                    ...state
                }
            }
            currentComp = state.renderList[state.currentIndex];
            temp = state.renderList[state.currentIndex + 1];
            state.renderList[state.currentIndex + 1] = currentComp;
            state.renderList[state.currentIndex] = temp;
            return {
                ...state,
                renderList:[...state.renderList],
                currentIndex: state.currentIndex + 1
            };
        case 'supIndex':
            if(state.currentIndex === state.renderList.length - 1){
                return {
                    ...state
                }
            }
            currentComp = state.renderList.splice(state.currentIndex,1);
            newList = [...state.renderList];
            newList.push(currentComp[0]);
            return {
                ...state,
                renderList:newList,
                currentIndex:newList.length - 1
            };
        case 'deleteComp':
            newList = [...state.renderList];
            newList.splice(state.currentIndex,1)
            return {
                ...state,
                renderList:newList,
            };
        case 'updateStyle':
            newList = [...state.renderList];
            currentComp = newList[state.currentIndex];
            tempObj = {
                ...currentComp
            }
            tempObj.style = {
                ...currentComp.style,
                ...action.pos
            }
            newList[state.currentIndex] = tempObj
            return {
                ...state,
                renderList:newList
            };
        case 'save':
            newList = [...state.snapShopList];
            newList.push(state.renderList);
            return {
                ...state,
                snapShopList:newList,
                snapShopIndex:state.snapShopList.length
            }
        case 'undo':
            index = state.snapShopIndex - 1;
            if(index < 0){
                index = -1;
                state.renderList = [];
            }else{
                state.renderList = state.snapShopList[index];
            }
            return {
                ...state,
                renderList:[...state.renderList],
                snapShopIndex:index
            }
        case 'redo':
            index = state.snapShopIndex + 1;
            if(index > state.snapShopList.length - 1)index = state.snapShopList.length - 1;
            state.renderList = state.snapShopList[index];
            return {
                ...state,
                renderList:[...state.renderList],
                snapShopIndex:index
            }
        default:
            return state;
    }
}

export {MyReducer}