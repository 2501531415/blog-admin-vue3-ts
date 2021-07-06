import http from '@/utils/http'
import {LearnCategoryModel,LearnCategoryParams,LearnPublicModel,LearnParams,LearnModel,LearnDetailModel} from './model/learnModel'

enum LearnCategory{CATEGORY='/learn/nav',ADD='learn/nav',DELETE='/learn/nav'}

enum Learn{LIST='/learn',ADD='/learn/add',DETAIL='/learn/detail'}


export function getLearnCategoryApi(){
    return http.get<LearnCategoryModel>(LearnCategory.CATEGORY)
}


export function addLearnCategoryApi(params:Omit<LearnCategoryParams,'_id'>){
    return http.post<LearnPublicModel>(LearnCategory.ADD,params)
}

export function deleteLearnCategoryApi(id:string){
    return http.delete<LearnPublicModel>(`${LearnCategory.DELETE}/${id}`)
}

export function addLearnApi(params:LearnParams){
    return http.post<LearnPublicModel>(Learn.ADD,params)
}

export function getLearnListApi(query?:string){
    return http.post<LearnModel>(Learn.LIST,{query})
}

export function deleteLearnApi(id:string){
    return http.delete<LearnPublicModel>(`${Learn.LIST}/${id}`)
}

export function getLearnDetailApi(id:string){
    return http.get<LearnDetailModel>(`${Learn.DETAIL}/${id}`)
}
