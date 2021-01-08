const initialState = {
    currentIndex:0,
    renderList:[],
    startX:0,
    startY:0,
    startTop:0,
    startLeft:0,
    snapShopList:[]
}

function MyReducer(state = initialState,action){
    let currentComp;
    let temp;
    switch (action.type){
        case 'AddComp':
            state.renderList.push(action.comp);
            let newList = [...state.renderList];
            return {
                ...state,
                renderList:newList,
                currentIndex:state.renderList.length - 1
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
            // pos.top = currY - startY + startTop
            // pos.left = currX - startX + startLeft
            currentComp.style = {
                ...currentComp.style,
                top: action.pos.currY - state.startY + state.startTop,
                left: action.pos.currX - state.startX + state.startLeft
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
            };
        case 'sdownIndex':
            if(state.currentIndex === 0){
                return {
                    ...state
                }
            }
            currentComp = state.renderList.splice(state.currentIndex,1);
            state.renderList.unshift(currentComp[0]);
            return {
                ...state,
                renderList:[...state.renderList],
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
            };
        case 'supIndex':
            if(state.currentIndex === state.renderList.length - 1){
                return {
                    ...state
                }
            }
            currentComp = state.renderList.splice(state.currentIndex,1);
            state.renderList.push(currentComp[0]);
            return {
                ...state,
                renderList:[...state.renderList],
            };
        case 'deleteComp':
            state.renderList.splice(state.currentIndex,1)
            return {
                ...state,
                renderList:[...state.renderList],
            };
        case 'save':
            state.snapShopList.push(state.renderList);
            return {
                ...state,
                snapShopList:[...state.snapShopList]
            }
        case 'updateStyle':
            // currentComp = state.renderList[state.currentIndex];
            // currentComp.style = {
            //     ...currentComp.style,
            //     // ...action.pos
            // }
            // return {
            //     ...state,
            //     renderList:[...state.renderList]
            // };
            return state;
        default:
            return state;
    }
}

export {MyReducer}