import { publicModel } from "./index";

export interface UserModel extends publicModel{
    data:UserList[]
}

export interface UserList{
    avatar_url: string,
    created_time: string,
    email: string,
    password: string,
    phone: number,
    type: number,
    updated_time:string,
    username: string
}