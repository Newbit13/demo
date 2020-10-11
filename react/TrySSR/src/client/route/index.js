import React,{Fragment} from 'react'
import {Route,Switch} from 'react-router-dom'

import {routeConfig} from './route.config';

import Header from './header';

export const App = ({initialData})=>{
    return (
        <Fragment>
            <Header />
            <Switch>
                {routeConfig.map(v=>{
                    const {component:Component,...rest} = v;
                    return  <Route 
                        {...rest}
                        render={(p)=>{//这个P包含了路由参数，很重要，必传
                            return <Component initialData={initialData} {...p}/>
                        }
                    }/>
                })}
            </Switch>
        </Fragment>
    )
}