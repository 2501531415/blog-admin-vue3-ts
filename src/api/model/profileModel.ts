import { publicModel } from "./index";

export interface IntroduceParams{
    name:string,
    nickName:string,
    avatar:string,
    gender:string,
    age:string,
    birthday?:string,
    address?:string,
    company?:string,
    introduce:string,
    tags:string,
    _id?:string,
    id?:string
}

export interface IntroduceModel extends publicModel{
    data:Required<IntroduceParams>[]
}

export interface IntroducePublicModel extends publicModel{
    
}