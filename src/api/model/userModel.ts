import { publicModel } from "./index";

export interface UserModel extends publicModel{
    data:UserList[]
}

export interface AddUserModel extends publicModel{
    
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

export interface AddUserParams{
    username:string,
    password:string,
    type:number | string,
    phone:number | string,
    email:string
    avatar_url?:string
}

