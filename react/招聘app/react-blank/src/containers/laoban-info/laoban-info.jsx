import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {NavBar,Button,InputItem,TextareaItem,WingBlank,WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'

import UserHead from '../../components/user-head/user-head'
import {update} from '../../redux/actions'
class LaobanInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
            company:'',
            salary:'',
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
            return  <Redirect to='/laoban'/>
        }
        return (
            <div>
                <NavBar>信息完善</NavBar>
                <div style={{height:50}}></div>
                <WhiteSpace />
                <UserHead username={this.props.user.username} sid={this.props.user._id} imgurl={this.props.user.head}/>
                <WhiteSpace />
                <WingBlank>
                    <InputItem placeholder='请输入职位' onChange={(v)=>this.handlerChange('title',v)}>招聘职位</InputItem>
                    <InputItem placeholder='请输入薪酬' onChange={(v)=>this.handlerChange('salary',v)}>薪酬范围</InputItem>
                    <InputItem placeholder='请输入公司名' onChange={(v)=>this.handlerChange('company',v)}>公司名称</InputItem>
                    <TextareaItem title='技能要求' rows={3} placeholder='请填写需求' onChange={(v)=>this.handlerChange('info',v)}/>
                    <Button type='primary' onClick={this.save}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}

export  default connect(
    state=>({user:state.user}),
    {update}
)(LaobanInfo)