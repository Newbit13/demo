type userType = "dashen" | "laoban";

type dataType = {
  code: number;
  msg?: string;
  data?: string;
};
type dispatchType = (arg0: { type: string; data: any }) => void;

type registerType = {
  username: string;
  password: string;
  password2: string;
  type: userType;
};
type chatType = {
  chat_id: string;
  from: string;
  to: string;
  isRead: number;
  content: string;
};
type sendMsgType = (msg: {
  chat_id: string;
  from: string;
  to: string;
  content: string;
  createTime: number;
}) => any;
type LoginType = {
  username: string;
  password: string;
};
type updateType = {
  username: string;
  type: userType;
  _id: string;
  head: string;
};

type actionType = {
  type: string;
  data: any;
};

type initChatListType = {
  users: {};
  chatList: {
    chat_id: string;
    from: string;
    to: string;
    isRead: number;
    unReadCount: number;
    content: string;
  }[];
  unReadCount: number;
};

type initUserListType = {
  _id: string;
  username: string;
  head: string;
  title: string;
  company: string;
  salary: string;
  info: string;
}[];

type initUser = {
  username: string;
  type: string;
  head: string;
  company: string;
  title: string;
  salary: string;
  redirect: string;
}