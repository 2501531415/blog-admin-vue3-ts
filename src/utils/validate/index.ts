export function emailValidate(value:any):boolean{
    const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    return emailReg.test(value)
}   

export function phoneValidate(value:any):boolean{
    const phoneReg = /^1[3-9]\d{9}$/
    return phoneReg.test(value)
}