import React,{Component} from 'react'
import {NavBar,Button,InputItem,TextareaItem,WingBlank,WhiteSpace} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import UserHead from '../../components/user-head/user-head'
import {update} from '../../redux/actions'
class dashenInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
            info:''
        }
    }
    handlerChange(name,v){
        this.setState({
            [name]:v
        })
    }
    save = ()=>{
        this.props.update(this.state)
    }
    render(){
        if(this.props.user.info){
            return  <Redirect to='/dashen'/>
        }
        return (
            <div>
                <NavBar>信息完善</NavBar>
                <div style={{height:50}}></div>
                <WhiteSpace />
                <UserHead username={this.props.user.username} sid={this.props.user._id} imgurl={this.props.user.head}/>
                <WhiteSpace />
                <WingBlank>
                    <InputItem placeholder='请输入求职职位' onChange={(v)=>this.handlerChange('title',v)}>应聘岗位</InputItem>
                    <TextareaItem title='自我介绍' rows={3} placeholder='请填写自我介绍' onChange={(v)=>this.handlerChange('info',v)}/>
                    <Button type='primary' onClick={this.save}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}

export  default connect(
    state=>({user:state.user}),
    {update}
)(dashenInfo)