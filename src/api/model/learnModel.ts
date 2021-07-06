import { publicModel } from "./index";

export interface LearnCategoryParams{
    imgUrl:string,
    name: string,
    type: string,
    _id: string
}

export interface LearnCategoryModel extends publicModel{
    data:LearnCategoryParams[]
}

// export interface DeleteLearnCategoryModel extends publicModel{

// }

// export interface EditLearnCategoryModel extends publicModel{

// }
export interface LearnPublicModel extends publicModel{

}

interface LearnMete{
    views:number
	likes: number
	comments: number
}

export interface LearnParams{
    title:string,
    desc?:string,
    keyWord?:string,
    number?:number,
    type?:string,
    author?:string,
    content:string
    img_url?:string
    // 0发布 1草稿箱
    status:number,
    meta?: LearnMete,
	// 创建日期
	create_time?:string, 
	// 最后修改日期
	update_time?:string,
    _id?:string,
    id?:string, 
}
export interface LearnModel extends publicModel{
    data:LearnParams[]
}

export interface LearnDetailModel extends publicModel{
    detail:Required<LearnParams>
}