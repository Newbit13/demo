export function getLoginRedirect(type,info){
    let redirectUrl = ''
    if(type === 'dashen'){
        redirectUrl = './dashen'
    }else{
        redirectUrl = './laoban'
    }
    if(!info){
        redirectUrl += 'info'
    }
    return redirectUrl
}