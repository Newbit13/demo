const initialState = {
    currentIndex:0,
    renderList:[],
    startX:0,
    startY:0,
    startTop:0,
    startLeft:0,
    snapShopList:[],
    snapShopIndex:0
}

function MyReducer(state = initialState,action){
    let currentComp;
    let temp;
    let index;
    let newList;
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
            newList = [...state.renderList];
            newList.unshift(currentComp[0])
            return {
                ...state,
                renderList:newList,
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
            newList = [...state.renderList];
            newList.push(currentComp[0]);
            return {
                ...state,
                renderList:newList,
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
            currentComp.style = {
                ...currentComp.style,
                ...action.pos
            }
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
            console.log(state.snapShopList);
            index = state.snapShopIndex - 1;
            if(index < 0)index = 0;
            state.renderList = state.snapShopList[index];
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