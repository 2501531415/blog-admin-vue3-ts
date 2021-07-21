import { publicModel } from "./index"

export interface MessageParams{
    username:string
    content:string
    avatar:string    
    created_time:string,
    _id:string,
    [index:string]:any
}

export interface MessageModel extends publicModel{
    data:MessageParams[],
    total:number
}

interface deleteSuccessModel{
    n:number,
    deletedCount:number,
    ok:number
}
export interface MessageDeleteModel extends publicModel{
    data:deleteSuccessModel
}