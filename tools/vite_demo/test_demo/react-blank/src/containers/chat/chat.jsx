import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem, Icon } from "antd-mobile";
import QueueAnim from "rc-queue-anim";

import { readMsg, sendMsg } from "../../redux/actions";
const defaultImg = require("../../assets/imgs/pkq.jpg");
const Item = List.Item;
class Chat extends Component {
  componentDidMount() {
    const from = this.props.match.params.userid;
    this.props.readMsg(from);
    window.scrollTo(0, document.body.scrollHeight);
  }
  componentWillUnmount() {
    const from = this.props.match.params.userid;
    this.props.readMsg(from);
  }
  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  state = {
    content: "",
  };
  send = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const chat_id = [from, to].sort().join("-");
    this.props.sendMsg({
      from,
      to,
      chat_id,
      createTime: Date.now(),
      content: this.state.content,
    });
    this.setState({
      content: "",
    });
  };
  render() {
    const from = this.props.match.params.userid;
    //异步数据如果还没传过来选择返回null
    if (!this.props.ChatList.users[from]) {
      return null;
    }
    const { username, head } = this.props.ChatList.users[from];
    const userid = this.props.user._id;
    const headImg = head ? "/handlerImg?sid=" + head : defaultImg;
    const chat_id = [userid, from].sort().join("-");
    const thatChatList = this.props.ChatList.chatList.filter(
      (chat) => chat.chat_id === chat_id
    );
    return (
      <div>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {username}
        </NavBar>
        <div style={{ height: 50 }}></div>
        <List>
          {thatChatList.map((chat, index) => {
            if (chat.to === userid) {
              return (
                <Item key={index} thumb={headImg}>
                  {chat.content}
                </Item>
              );
            } else {
              return (
                <Item key={index} className="chat-me" extra="我">
                  {chat.content}
                </Item>
              );
            }
          })}
        </List>
        <div style={{ height: 50 }}></div>
        <div className="bottom-input">
          <InputItem
            placeholder="请输入内容"
            value={this.state.content}
            extra={<span onClick={this.send}>发送</span>}
            onChange={(value) => {
              this.setState({ content: value });
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    ChatList: state.ChatList,
    user: state.user,
  }),
  { readMsg, sendMsg }
)(Chat);
