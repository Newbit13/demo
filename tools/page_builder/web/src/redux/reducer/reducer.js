import {combineReducers} from 'redux'

import metaData_reducer from './metaData_reducer'
import edit_reducer from './edit_reducer'

const web_reducers = combineReducers({
    metaData_reducer,
    edit_reducer
})

export default web_reducers