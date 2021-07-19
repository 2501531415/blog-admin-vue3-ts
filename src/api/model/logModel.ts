import { publicModel } from "./index"

export interface LoginLogParams{
    admin_id:string,
    admin_name:string,
    desc?:string,
    create_at?:string
    _id:string,
    [index:string]:any
}

export interface LoginLogModel extends publicModel{
    data:LoginLogParams[],
    total:number
}

export interface LogpublicModel extends publicModel{

}