import {
    AUTH_SUCCESS,
    ERROR_MSG,
    ACCEPT_USER,
    RESET_USER,
    GET_USER_LIST,
    GET_CHAT_LIST,
    GET_CHAT,
    READ_CHAT,
    GET_CHAT_By_Self
} from './action-types'

const initUser = {
    username:'',
    type:'',
    head:'',
    company:'',
    title:'',
    salary:'',
    redirect:''
}

export function user(state = initUser,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...action.data}
        case ERROR_MSG:
            return {...state,msg:action.data}
        case ACCEPT_USER:
            return action.data
        case RESET_USER:
            return {...initUser,msg:action.data}
        default:
            return state
    }
}

const initUserList = []
export function userList(state = initUserList,action){
    switch(action.type){
        case GET_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChatList = {
    users:{},
    chatList:[],
    unReadCount:0
}
export function ChatList(state = initChatList,action){
    switch(action.type){
        case GET_CHAT:
            return {
                users:state.users,
                chatList:[...state.chatList,action.data],
                unReadCount:action.data.to === action.data.userid?state.unReadCount+1:state.unReadCount
            }
        case GET_CHAT_LIST:
            return {
                users:action.data.users,
                chatList:action.data.chatList,
                unReadCount:action.data.unReadCount
            }
        case READ_CHAT:
            let from = action.data.from
            return {
                //state.chatList中from为对方的设置为已读
                users:state.users,
                chatList:state.chatList.map((chat)=>{
                    if(chat.from === from && chat.isRead === 0){
                        return {...chat,isRead:1}
                    }else{
                        return {...chat}
                    }
                }),
                unReadCount:state.unReadCount - action.data.count
            }
        default:
            return state
    }
}