import { publicModel,Mete } from "./index";

export interface ArticleParams{
    title:string,
    desc?:string,
    number?:number
    type?:string,
    author?:string,
    content:string,
    img_url?:string,
    avatar?:string,
    // 0发布 1草稿箱
    status?:number,
    hotTop?:number,
    // 0 原创 1转载
    origin?:string,
    meta?: Mete,
	// 创建日期
	create_time?:string,

	// 最后修改日期
	update_time?: string,
    _id?:string,
    id?:string
}

export interface ArticleListModel extends publicModel{
    data:ArticleParams[]
}

export interface ArticlePublicModel extends publicModel{

}

export interface ArticleDetailModel extends publicModel{
    detail:Required<ArticleParams>
}