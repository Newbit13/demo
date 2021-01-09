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

function computeAuxiliary(state,currentComp,action){
    let haveMatch_vertical = false;
    let haveMatch_horizontal = false;
    let vertical_diration = (action.pos.currY - state.startY)>0?'down':'up';
    let horizontal_diration = (action.pos.currX - state.startX)>0?'right':'left';
    let diffV = 3;
    function dirationCommonFn(diration,comp,currentComp,diffV){
        let keyDiration;
        let KeyValue;
        let haveMatch = {
            left:false,
            right:false,
            up:false,
            down:false
        };
        let auxiliart_line_positon_v;
        if(diration === 'left' || diration === 'right'){
            keyDiration = 'left';
            KeyValue = 'width';
        }else{
            keyDiration = 'top';
            KeyValue = 'height';
        }
        let halfComp = comp.style[keyDiration] + comp.style[KeyValue]/2;
        let halfCurComp = currentComp.style[keyDiration] + currentComp.style[KeyValue]/2;
        let compBorder = comp.style[keyDiration] + comp.style[KeyValue];
        if(diration === 'left' || diration === 'up'){
            if(currentComp.style[keyDiration] >= compBorder - diffV && currentComp.style[keyDiration] <= compBorder + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = compBorder;
                auxiliart_line_positon_v = currentComp.style[keyDiration];
            }else if(halfCurComp >= compBorder - diffV && halfCurComp <= compBorder + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = compBorder - currentComp.style[KeyValue]/2;
                auxiliart_line_positon_v = compBorder;
            }else if(currentComp.style[keyDiration] >= halfComp - diffV && currentComp.style[keyDiration] <= halfComp + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = halfComp;
                auxiliart_line_positon_v = currentComp.style[keyDiration];
            }else if(halfCurComp >= halfComp - diffV && halfCurComp <= halfComp + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = halfComp - currentComp.style[KeyValue]/2;
                auxiliart_line_positon_v = halfComp;
            }else if(halfCurComp >= comp.style[keyDiration] - diffV && halfCurComp <= comp.style[keyDiration] + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = comp.style[keyDiration] - currentComp.style[KeyValue]/2;
                auxiliart_line_positon_v = comp.style[keyDiration];
            }else if(currentComp.style[keyDiration] >= comp.style[keyDiration] - diffV && currentComp.style[keyDiration] <= comp.style[keyDiration] + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = comp.style[keyDiration];
                auxiliart_line_positon_v = currentComp.style[keyDiration];
            }
        }else if(diration === 'right' || diration === 'down'){
            let curcompBorder = currentComp.style[keyDiration] + currentComp.style[KeyValue];
            if(curcompBorder >= comp.style[keyDiration] - diffV && curcompBorder <= comp.style[keyDiration] + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = comp.style[keyDiration] - currentComp.style[KeyValue];
                auxiliart_line_positon_v = comp.style[keyDiration];
            }else if(halfCurComp >= comp.style[keyDiration] - diffV && halfCurComp <= comp.style[keyDiration] + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = comp.style[keyDiration] - currentComp.style[KeyValue]/2;
                auxiliart_line_positon_v = comp.style[keyDiration];
            }else if(curcompBorder >= halfComp - diffV && curcompBorder <= halfComp + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = halfComp - currentComp.style[KeyValue];
                auxiliart_line_positon_v = halfComp;
            }else if(halfCurComp >= halfComp - diffV && halfCurComp <= halfComp + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = halfComp - currentComp.style[KeyValue]/2;
                auxiliart_line_positon_v = halfComp;
            }else if(halfCurComp >= compBorder - diffV && halfCurComp <= compBorder + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = compBorder - currentComp.style[KeyValue]/2;
                auxiliart_line_positon_v = compBorder;
            }else if(curcompBorder >= compBorder - diffV && curcompBorder <= compBorder + diffV){
                haveMatch[diration] = true;
                currentComp.style[keyDiration] = compBorder - currentComp.style[KeyValue];
                auxiliart_line_positon_v = compBorder;
            }
        }

        if(diration === 'left' || diration === 'right'){
            state.auxiliary.auxiliary_line_left = auxiliart_line_positon_v;
        }else{
            state.auxiliary.auxiliary_line_top = auxiliart_line_positon_v;
        }

        return haveMatch[diration];
    }
    state.renderList.forEach((comp,index)=>{
        if(index === state.currentIndex)return
        haveMatch_horizontal = dirationCommonFn(vertical_diration,comp,currentComp,diffV);
        haveMatch_vertical = dirationCommonFn(horizontal_diration,comp,currentComp,diffV);
    })
    
    state.auxiliary.auxiliary_vertical_line = haveMatch_vertical?true:false;
    state.auxiliary.auxiliary_horizontal_line = haveMatch_horizontal?true:false;
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

            // 辅助线判断逻辑,这是个有副作用的函数
            computeAuxiliary(state,currentComp,action);

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