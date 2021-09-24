import React,{Component} from 'react'
import {NavBar,List,InputItem,WhiteSpace,WingBlank,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '@/components/logo/logo'
import {login} from '../../redux/actions'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
        }
    }
    handlerLogin = ()=>{
        this.props.login(this.state)
    }
    handlerChange = (name,val)=>{
        this.setState({
            [name]:val
        })
    }
    render(){
        const {redirect} = this.props.user

        if(redirect){
            return <Redirect to={redirect}></Redirect>
        }else{
            return (
                <div>
                    <NavBar>人&nbsp;才&nbsp;直&nbsp;聘</NavBar>
                    <Logo />
                    <WhiteSpace size="lg"/>
                    <WingBlank>
                        <List>
                            <WhiteSpace />
                            <InputItem placeholder='请输入用户名' onChange={(val)=>{this.handlerChange('username',val)}}>用户名</InputItem>
                            <WhiteSpace />
                            <InputItem placeholder='请输入密码' type="password" onChange={(val)=>{this.handlerChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码</InputItem>
                            <WhiteSpace />
                            <Button type="primary" onClick={this.handlerLogin}>登录</Button>
                            <WhiteSpace />
                            <Button onClick={()=>{this.props.history.push('/register')}} >没有账号</Button>
                        </List>
                    </WingBlank>
                </div>
            )
        }      
    }
}

export default connect(
    state=>({user:state.user}),
    {login}
)(Login)