import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {Switch,Route} from 'react-router-dom'


import Login from './containers/login/login'
import Regist from './containers/register/register'
import Main from './containers/main/main'
import store from './redux/store'

render(
    (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Regist}/>
                <Route component={Main}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    ),document.getElementById('root'))

