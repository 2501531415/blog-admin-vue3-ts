import http from '@/utils/http'
import {LearnCategoryModel,LearnCategoryParams,DeleteLearnCategoryModel,EditLearnCategoryModel,LearnParams,LearnModel,LearnDetailModel} from './model/learnModel'

enum LearnCategory{CATEGORY='/learn/nav',ADD='learn/nav',DELETE='/learn/nav'}

enum Learn{LIST='/learn',ADD='/learn/add',DETAIL='/learn/detail'}


export function getLearnCategoryApi(){
    return http.get<LearnCategoryModel>(LearnCategory.CATEGORY)
}


export function addLearnCategoryApi(params:Omit<LearnCategoryParams,'_id'>){
    return http.post<EditLearnCategoryModel>(LearnCategory.ADD,params)
}

export function deleteLearnCategoryApi(id:string){
    return http.delete<DeleteLearnCategoryModel>(`${LearnCategory.DELETE}/${id}`)
}

export function addLearnApi(params:LearnParams){
    return http.post<DeleteLearnCategoryModel>(Learn.ADD,params)
}

export function getLearnListApi(query?:string){
    return http.post<LearnModel>(Learn.LIST,{query})
}

export function deleteLearnApi(id:string){
    return http.delete<any>(`${Learn.LIST}/${id}`)
}

export function getLearnDetailApi(id:string){
    return http.get<LearnDetailModel>(`${Learn.DETAIL}/${id}`)
}
