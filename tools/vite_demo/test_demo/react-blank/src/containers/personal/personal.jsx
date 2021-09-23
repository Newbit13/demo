import React,{Component} from 'react'
import {Result,List,Button,WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
import JsCookie from 'js-cookie'

import {resetUserAction} from '../../redux/actions'
const defaultImg = require('../../assets/imgs/pkq.jpg')
const Item = List.Item
const Brief = Item.Brief

class Personal extends Component{
    logout = ()=>{
        JsCookie.remove('user_id')
        this.props.resetUserAction()
    }
    render(){
        const {username,head,company,title,salary,info} = this.props.user

        return (
            <div>
                <Result
                    img={<img src={head?'./handlerImg?sid='+head:defaultImg} alt='head' style={{width:'50px'}}/>}
                    title={username}
                    message={company}
                />
                <List renderHeader={()=>'相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{title}</Brief>
                        <Brief>信息：{info}</Brief>
                        {salary?<Brief>薪资：{salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace />
                <Button type='warning' onClick={this.logout}>退出登录</Button>
            </div>
        )
    }
}
export default connect(state=>({
    user:state.user
}),{resetUserAction})(Personal)