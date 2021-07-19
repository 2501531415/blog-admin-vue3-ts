import { publicModel } from "./index"

export interface LoginLogParams{
    admin_id:string,
    admin_name:string,
    desc:string,
    create_at?:string
    _id:string
}

export interface LoginLogModel extends publicModel{
    data:LoginLogParams[]
}

export interface LogpublicModel extends publicModel{

}