import http from '@/utils/http'
import {UserModel,AddUserParams,AddUserModel,DeleteUserModel,EditUserModel} from './model/userModel'

enum User{
    LOGIN = '/login',
    LIST = '/admin',
    ADD = '/admin/add',
    DELETE = '/admin',
    EDIT='/admin'
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
    return http.delete<DeleteUserModel>(`${User.DELETE}/${id}`)
}

export function editUserApi(id:string,params:AddUserParams){
    return http.put<EditUserModel>(`${User.EDIT}/${id}`,params)
}