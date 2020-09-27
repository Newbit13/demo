import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {WhiteSpace,WingBlank,Card} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'


const Header = Card.Header
const Body = Card.Body
const defaultImg = require('../../assets/imgs/pkq.jpg')
class UserList extends Component{
    render(){
        return (
            <WingBlank>
                <QueueAnim type='scale'>
                {
                    this.props.list.map((user)=>{
                        return (
                            <div key={user._id}>
                                <Card onClick={()=>this.props.history.push(`./chat/${user._id}`)}>
                                    <Header extra={user.username} thumb={user.head?'./handlerImg?sid='+user.head:defaultImg} thumbStyle={{width:50}}/>
                                    <Body>
                                        <div>职位：{user.title}</div>
                                        {user.company?<div>公司：{user.company}</div>:null}
                                        {user.salary?<div>月薪：{user.salary}</div>:null}
                                        <div>描述：{user.info}</div>
                                    </Body>
                                </Card>
                                <WhiteSpace />
                            </div>
                        )
                    })
                }
                </QueueAnim>
            </WingBlank>
        )
    }
}

export  default withRouter(UserList)