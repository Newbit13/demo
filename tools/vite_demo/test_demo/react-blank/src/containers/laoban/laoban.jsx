import React,{Component} from 'react'
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'
class Laoban extends Component{
    componentDidMount(){
        this.props.getUserList('laoban')
    }
    render(){
        return <UserList list={this.props.userList}></UserList>
    }
}

export  default connect(state=>({
    userList:state.userList
}),{getUserList})(Laoban)