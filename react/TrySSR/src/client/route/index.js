import React,{Fragment} from 'react'
import {Route,Switch} from 'react-router-dom'

import {routeConfig} from './route.config';

import Header from './header';

export const App = ()=>{
    return (
        <Fragment>
            <Header />
            <Switch>
                {routeConfig.map(v=>(
                    <Route {...v}/>
                ))}
            </Switch>
        </Fragment>
    )
}