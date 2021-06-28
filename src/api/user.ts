import http from '@/utils/http'
import {UserModel} from './model/userModel'

enum User{
    LOGIN = '/login',
    List = '/admin'
}

export interface UserInfo{
    admin_id:string,
    avatar:string,
    username:string
}

interface LoginModel{
    adminInfo:UserInfo,
    err_code:number,
    message:string,
    token:string
}

export interface LoginParams{
    username:string | number,
    password:string | number
}

export function login(params:LoginParams){
    return http.post<LoginModel>(User.LOGIN,params)
}

export function userList(){
    return http.post<UserModel>(User.List)
}