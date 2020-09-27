import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
const Brief = Item.Brief
const defaultImg = require('../../assets/imgs/pkq.jpg')

class Message extends Component{
    processChat = (chatList,userId)=>{
        //userId是为了区分未读消息是否为自己发的，是自己发的则忽略
        chatList.forEach(element => {
            if(element.to === userId && element.isRead === 0){
                element.unReadCount = 1
            }else{
                element.unReadCount = 0
            }
        })

        const chatGloupObj = {}
        chatList.forEach(element => {
            const chat_id = element.chat_id
            const lastChat = chatGloupObj[chat_id]
            if(!lastChat){
                chatGloupObj[chat_id] = element
            }else{
                if(element.createTime>lastChat.createTime){
                    element.unReadCount += chatGloupObj[chat_id].unReadCount
                    chatGloupObj[chat_id] = element
                }else{
                    chatGloupObj[chat_id].unReadCount += element.unReadCount
                }
            }
        });
        return Object.values(chatGloupObj)
    }
    render(){
        //对chatList进行处理，分组
        const {chatList,users} = this.props.ChatList
        const userId = this.props.user._id
        let chatGloupObjs = this.processChat(chatList,userId)
        return (
            <List>
                <QueueAnim type='left'>
                    {chatGloupObjs.map((chat)=>{
                        const otherUserId = chat.from === userId?chat.to:chat.from
                        const {head,username} = users[otherUserId]
                        const headImg = head?'/handlerImg?sid='+head:defaultImg
                        return <Item 
                        key={chat.chat_id} 
                        extra={<Badge 
                        text={chat.unReadCount} 
                        overflowCount={99} />} 
                        thumb={headImg} 
                        arrow='horizontal'
                        onClick={()=>this.props.history.push(`./chat/${otherUserId}`)}
                        >
                        {username}
                        <Brief>{chat.content}</Brief>
                        </Item>
                    })}
                </QueueAnim>
            </List>
        )
    }
}
export  default connect(state=>({
    ChatList:state.ChatList,
    user:state.user
}),{})(Message)