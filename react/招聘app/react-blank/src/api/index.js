import ajax from './ajax'

export function reqRegister(user){
    return ajax('/register',user,"POST")
}

export function reqLogin(user){
    return ajax('/login',user,"POST")
}

export function reqUpdate(user){
    return ajax('/update',user,"POST")
}

export function reqUploadImg(data,sourceId){
    return ajax('/uploadImg?sid='+sourceId,data,"POST")
}

export function reqGetUser(){
    return ajax('/user')
}

export function reqUserList(typeObject){
    return ajax('/getUserList',typeObject)
}

export function reqChatList(){
    return ajax('/getChatList')
}

export function reqReadMsg(from){
    return ajax('/readMsg',{from},'POST')
}
