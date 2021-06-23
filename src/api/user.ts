import http from '@/utils/http'

enum User{
    LOGIN = '/login'
}

interface adminInfo{
    admin_id:string,
    avatar:string,
    username:string
}

interface LoginModel{
    adminInfo:adminInfo,
    err_code:number,
    message:string,
    token:string
}

export function test(){
    return http.post<LoginModel>(User.LOGIN,{
        username:'admin',
        password:'123456'
    })
}