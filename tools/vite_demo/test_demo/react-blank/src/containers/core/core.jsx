import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {NavBar,TabBar} from 'antd-mobile'

import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import '../../assets/css/index.less'

const Item = TabBar.Item
class Core extends Component{
    NavList = [
        {title:'老板列表',text:'老板',path:'/dashen',icon:'laoban',component:Laoban},
        {title:'大神列表',text:'大神',path:'/laoban',icon:'dashen',component:Dashen},
        {title:'消息列表',text:'消息',path:'/message',icon:'message',component:Message},
        {title:'个人中心',text:'个人',path:'/personal',icon:'personal',component:Personal}
    ]
    render(){
        const path = this.props.location.pathname
        const curNav = this.NavList.find((v)=>{return path === v.path})
        
        if(this.NavList.length === 4){
            if(this.props.user.type === 'laoban'){
                this.NavList[0].hide = true
            }else{
                this.NavList[1].hide = true
            }
            this.NavList = this.NavList.filter((v)=>!v.hide)
        }
        this.NavList[1].unRead = this.props.ChatList.unReadCount
        
        return (
            <div>
                <NavBar>{curNav.title}</NavBar>
                <div style={{height:50}}></div>
                <Switch>
                {
                    this.NavList.map((nav)=>{
                        return <Route path={nav.path} component={nav.component} key={nav.path} />
                    })
                }
                </Switch>
                <div style={{height:50}}></div>
                <TabBar>
                    {
                        this.NavList.map((nav)=>{
                            return <Item title={nav.text} icon={{uri:require('../../assets/imgs/tabbar/'+nav.icon+'.png')}}
                            selectedIcon={{uri:require('../../assets/imgs/tabbar/'+nav.icon+'-selected.png')}}
                            selected={path === nav.path}
                            onPress={()=>{this.props.history.replace(nav.path)}}
                            key={nav.path}
                            badge={nav.unRead}
                            />
                        })
                    }
                </TabBar>
            </div>
        )
    }
}

export  default  connect(state=>({
    user:state.user,
    ChatList:state.ChatList
}),{})(Core)