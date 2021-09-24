import ajax from "./ajax";

export function reqRegister(user: registerType) {
  return ajax("/register", user, "POST");
}

export function reqLogin(user: LoginType) {
  return ajax("/login", user, "POST");
}

export function reqUpdate(user: updateType) {
  return ajax("/update", user, "POST");
}

export function reqUploadImg(data: FormData, sourceId: string) {
  return ajax("/uploadImg?sid=" + sourceId, data, "POST");
}

export function reqGetUser() {
  return ajax("/user");
}

export function reqUserList(typeObject: { type: userType }) {
  return ajax("/getUserList", typeObject);
}

export function reqChatList() {
  return ajax("/getChatList");
}

export function reqReadMsg(from: string) {
  return ajax("/readMsg", { from }, "POST");
}
