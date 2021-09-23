import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import jsCookie from 'js-cookie'

import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from '../laoban-info/laoban-info'
import Chat from '../chat/chat'
import Core from '../core/core'
import {getLoginRedirect} from '../../util'
import {getUser,getChatList} from '../../redux/actions'

class Main extends Component{
    componentDidMount(){
        if(jsCookie.get('user_id') && !this.props.user._id){
            this.props.getUser()
        }
        if(jsCookie.get('user_id')){
            this.props.getChatList(this.props.user._id)
        }
    }
    render(){
        if(!jsCookie.get('user_id')){
            return <Redirect to='./login'/>
        }
        if(!this.props.user._id){
            return null//这里应该显示数据加载中
        }
        if(this.props.location.pathname === '/'){
            const {type,info} = this.props.user
            let redirectUrl = getLoginRedirect(type,info)
            return <Redirect to={redirectUrl}/>
        }
        return (
            <Switch>
                <Route path='/dashenInfo' component={DashenInfo} />
                <Route path='/laobanInfo' component={LaobanInfo} />
                <Route path='/chat/:userid' component={Chat} />
                <Route path='/' component={Core} />
            </Switch>
        )
    }
}

export  default  connect(state=>({
    user:state.user
}),{getUser,getChatList})(Main)