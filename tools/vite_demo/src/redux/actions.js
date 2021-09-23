import {
    reqRegister,
    reqLogin,
    reqUpdate,
    reqGetUser,
    reqUserList,
    reqChatList,
    reqReadMsg
} from '../api/index'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    ACCEPT_USER,
    RESET_USER,
    GET_USER_LIST,
    GET_CHAT,
    GET_CHAT_LIST,
    READ_CHAT,
} from './action-types'
import {Toast} from 'antd-mobile'
import io from 'socket.io-client'

const authSuccessAction = (data)=>({type:AUTH_SUCCESS,data})
const errorMsgAction = (msg)=>{
    Toast.fail(msg)
    return {type:ERROR_MSG,data:msg}
}
const acceptUserAction = (data)=>({type:ACCEPT_USER,data})
export const resetUserAction = (msg)=>{
    io.socket.emit('disconnect2') //通知服务器情况socket
    io.socket = null //重置用户时需要清空socket
    return {type:RESET_USER,data:msg}
}
const getUserListAction = (data)=>({type:GET_USER_LIST,data})

function init(userid,dispatch){
    if(!io.socket){
        io.socket = io('ws://localhost:4000')
        io.socket.emit('firstConnect',{userid})
        io.socket.on('receiveMsg',function(data){
            dispatch(recerveMsgAction(data,userid))
        })
        io.socket.on('disconnect',function(){
            console.log('服务器已断开连接');
            io.socket = null
        })
    }
}

const recerveMsgAction = (data,userid)=>({type:GET_CHAT,data:{...data,userid}})
const getChatsAction = (data)=>({type:GET_CHAT_LIST,data})
const readMsgAction = (data,from)=>({type:READ_CHAT,data:{count:data,from}})

export const register = (user)=>{
    const {username,password,password2} = user
    if(!username){
        return errorMsgAction('请输入用户名')
    }
    if(!password){
        return errorMsgAction('请输入密码')
    }
    if(password !== password2){
        return errorMsgAction('两次密码不一致')
    }
    return async dispatch=>{
        const response = await reqRegister(user)
        const result = response.data
        if(result.code === 0){
            dispatch(authSuccessAction({...result.data,redirect:'/'}))
        }else{
            dispatch(errorMsgAction(result.msg))
        }
    }
}

export const login = (user)=>{
    const {username,password} = user
    if(!username){
        return errorMsgAction('请输入用户名')
    }
    if(!password){
        return errorMsgAction('请输入密码')
    }
    return async dispatch=>{
        const response = await reqLogin(user)
        const result = response.data
        if(result.code === 0){
            dispatch(authSuccessAction({...result.data,redirect:'/'}))
        }else{
            dispatch(errorMsgAction(result.msg))
        }
    }
}

export const update = (user)=>{
    return async dispatch=>{
        const response = await reqUpdate(user)
        const result = response.data
        if(result.code === 0){
            dispatch(acceptUserAction(result.data))
        }else{
            dispatch(resetUserAction(result.msg))
        }
    }
}

export const getUser = ()=>{ 
    //该异步方法是为了应对刷新用的，刷新后只有cookie没有state相关数据，
    //所以要重新获取数据，包括socket初始化
    return async dispatch=>{
        const response = await reqGetUser()
        const result = response.data
        if(result.code === 0){
            init(result.data._id,dispatch)
            dispatch(acceptUserAction(result.data))
        }else{
            dispatch(resetUserAction(result.msg))
        }
    }
}

export const getUserList = (type)=>{
    return async dispatch=>{
        const response = await reqUserList({type})
        const result = response.data
        if(result.code === 0){
            dispatch(getUserListAction(result.data))
        }else{
            dispatch(resetUserAction(result.msg))
        }
    }
}

export const getChatList = (userid)=>{
    return async dispatch=>{
        const response = await reqChatList()
        const result = response.data
        if(result.code === 0){
            init(userid,dispatch) //进入主页面，取得用户数据后使用websocket
            dispatch(getChatsAction(result.data))
        }else{
            dispatch(resetUserAction(result.msg))
        }
    }
}
export const readMsg = (from)=>{
    return async dispatch=>{
        const response = await reqReadMsg(from)
        const result = response.data
        if(result.code === 0){
            dispatch(readMsgAction(result.data,from))
        }else{
            dispatch(resetUserAction(result.msg))
        }
    }
}

export const sendMsg = ({from,to,content,chat_id,createTime})=>{
    return dispatch=>{
        init(from,dispatch)
        io.socket.emit('sendMsg',{from,to,content})
    }
}