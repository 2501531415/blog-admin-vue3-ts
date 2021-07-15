import { publicModel } from "./index";
interface DashboardTotalMeta{
    _id:string,
    views_total:number
    comments_total:number
    likes_total:number
}
export interface DashboardTotalParams{
    learn_meta_total:DashboardTotalMeta[],
    article_meta_total:DashboardTotalMeta[],
    learn_total:number,
    article_total:number,
    message_total:number,
    user_total:number,
    admin_total:number
}

interface DashboardEchartsValue{
    _id:number,
    value:number
}
export interface DashboardPostParams{
    [index:string]:DashboardEchartsValue[]
}
export interface DashboardTotalModel extends publicModel{
    data:DashboardTotalParams
}

export interface DashboardEchartsModel extends publicModel{
    data:DashboardEchartsValue[]
}

export interface DashboardPostModel extends publicModel{
    data:DashboardPostParams
}