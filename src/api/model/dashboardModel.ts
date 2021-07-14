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
    message_total:number
}

export interface DashboardTotalModel extends publicModel{
    data:DashboardTotalParams
}