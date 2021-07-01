import { publicModel } from "./index";

export interface UserModel extends publicModel{
    data:UserList[]
}

export interface AddUserModel extends publicModel{
    
}
export interface DeleteUserModel extends publicModel{

}
export interface UserList{
    avatar_url: string,
    created_time: string,
    email: string,
    password: string,
    phone: number | null,
    type: number | null,
    updated_time:string,
    username: string,
    _id:string
}

export interface AddUserParams{
    username:string,
    password:string,
    phone: number | null,
    type: number | null,
    email:string
    avatar_url?:string
}

