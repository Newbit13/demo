import {
  reqRegister,
  reqLogin,
  reqUpdate,
  reqGetUser,
  reqUserList,
  reqChatList,
  reqReadMsg,
} from "../api/index";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  ACCEPT_USER,
  RESET_USER,
  GET_USER_LIST,
  GET_CHAT,
  GET_CHAT_LIST,
  READ_CHAT,
} from "./action-types";
import { Toast } from "antd-mobile";
import io, { Socket } from "socket.io-client";

const ioObj: {
  socket: Socket | null;
} = { socket: null };

const authSuccessAction = (data: dataType) => ({ type: AUTH_SUCCESS, data });
const errorMsgAction = (msg: string) => {
  Toast.fail(msg);
  return { type: ERROR_MSG, data: msg };
};
const acceptUserAction = (data: dataType) => ({ type: ACCEPT_USER, data });
export const resetUserAction = (msg: string) => {
  ioObj.socket?.emit("disconnect2"); //通知服务器情况socket
  ioObj.socket = null; //重置用户时需要清空socket
  return { type: RESET_USER, data: msg };
};
const getUserListAction = (data: dataType) => ({ type: GET_USER_LIST, data });

function init(userid: string, dispatch: dispatchType) {
  if (!ioObj.socket) {
    ioObj.socket = io("ws://localhost:4000");
    ioObj.socket.emit("firstConnect", { userid });
    ioObj.socket.on("receiveMsg", function (data: chatType) {
      dispatch(recerveMsgAction(data, userid));
    });
    ioObj.socket.on("disconnect", function () {
      console.log("服务器已断开连接");
      ioObj.socket = null;
    });
  }
}

const recerveMsgAction = (data: chatType, userid: string) => ({
  type: GET_CHAT,
  data: { ...data, userid },
});
const getChatsAction = (data: dataType) => ({ type: GET_CHAT_LIST, data });
const readMsgAction = (data: chatType, from: string) => ({
  type: READ_CHAT,
  data: { count: data, from },
});

export const register = (user: registerType) => {
  const { username, password, password2 } = user;
  if (!username) {
    return errorMsgAction("请输入用户名");
  }
  if (!password) {
    return errorMsgAction("请输入密码");
  }
  if (password !== password2) {
    return errorMsgAction("两次密码不一致");
  }
  return async (dispatch: dispatchType) => {
    const response = await reqRegister(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSuccessAction({ ...result.data, redirect: "/" }));
    } else {
      dispatch(errorMsgAction(result.msg));
    }
  };
};

export const login = (user: LoginType) => {
  const { username, password } = user;
  if (!username) {
    return errorMsgAction("请输入用户名");
  }
  if (!password) {
    return errorMsgAction("请输入密码");
  }
  return async (dispatch: dispatchType) => {
    const response = await reqLogin(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSuccessAction({ ...result.data, redirect: "/" }));
    } else {
      dispatch(errorMsgAction(result.msg));
    }
  };
};

export const update = (user: updateType) => {
  return async (dispatch: dispatchType) => {
    const response = await reqUpdate(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(acceptUserAction(result.data));
    } else {
      dispatch(resetUserAction(result.msg));
    }
  };
};

export const getUser = () => {
  //该异步方法是为了应对刷新用的，刷新后只有cookie没有state相关数据，
  //所以要重新获取数据，包括socket初始化
  return async (dispatch: dispatchType) => {
    const response = await reqGetUser();
    const result = response.data;
    if (result.code === 0) {
      init(result.data._id, dispatch);
      dispatch(acceptUserAction(result.data));
    } else {
      dispatch(resetUserAction(result.msg));
    }
  };
};

export const getUserList = (type: userType) => {
  return async (dispatch: dispatchType) => {
    const response = await reqUserList({ type });
    const result = response.data;
    if (result.code === 0) {
      dispatch(getUserListAction(result.data));
    } else {
      dispatch(resetUserAction(result.msg));
    }
  };
};

export const getChatList = (userid: string) => {
  return async (dispatch: dispatchType) => {
    const response = await reqChatList();
    const result = response.data;
    if (result.code === 0) {
      init(userid, dispatch); //进入主页面，取得用户数据后使用websocket
      dispatch(getChatsAction(result.data));
    } else {
      dispatch(resetUserAction(result.msg));
    }
  };
};
export const readMsg = (from: string) => {
  return async (dispatch: dispatchType) => {
    const response = await reqReadMsg(from);
    const result = response.data;
    if (result.code === 0) {
      dispatch(readMsgAction(result.data, from));
    } else {
      dispatch(resetUserAction(result.msg));
    }
  };
};

export const sendMsg: sendMsgType = ({ from, to, content }) => {
  return (dispatch: dispatchType) => {
    init(from, dispatch);
    ioObj.socket?.emit("sendMsg", { from, to, content });
  };
};
