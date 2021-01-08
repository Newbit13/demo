const initialState = {
    currentIndex:0,
    renderList:[],
    startX:0,
    startY:0,
    startTop:0,
    startLeft:0
}

function MyReducer(state = initialState,action){
    let currentComp;
    switch (action.type){
        case 'AddComp':
            state.renderList.push(action.comp);
            let newList = [...state.renderList];
            return {
                ...state,
                renderList:newList
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
            let temp = state.renderList[state.currentIndex - 1];
            state.renderList[state.currentIndex - 1] = currentComp;
            state.renderList[state.currentIndex] = temp;
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
        default:
            return state;
    }
}

export {MyReducer}