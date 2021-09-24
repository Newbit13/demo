import {createStore,combineReducers,applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {user,userList,ChatList} from './reducers'

const reducers = combineReducers({
    user,
    userList,
    ChatList
})
const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))
export default store