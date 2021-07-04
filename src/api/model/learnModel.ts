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

export interface DeleteLearnCategoryModel extends publicModel{

}

export interface EditLearnCategoryModel extends publicModel{

}
