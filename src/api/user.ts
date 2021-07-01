import http from '@/utils/http'
import {UserModel,AddUserParams,AddUserModel,DeleteUserModel} from './model/userModel'

enum User{
    LOGIN = '/login',
    LIST = '/admin',
    ADD = '/admin/add',
    DELETE = '/admin/delete'
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

export function userListApi(query?:string){
    return http.post<UserModel>(User.LIST,{query})
}

export function addUserApi(params:AddUserParams){
    return http.post<AddUserModel>(User.ADD,params)
}

export function deleteUserApi(id:string){
    return http.post<DeleteUserModel>(User.DELETE,{id})
}