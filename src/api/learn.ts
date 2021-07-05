import http from '@/utils/http'
import {LearnCategoryModel,LearnCategoryParams,DeleteLearnCategoryModel,EditLearnCategoryModel,LearnParams,LearnModel} from './model/learnModel'

enum LearnCategory{CATEGORY='/learn/nav',ADD='learn/nav',DELETE='/learn/nav'}

enum Learn{List='/learn',ADD='/learn/add'}


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
    return http.post<LearnModel>(Learn.List,{query})
}

export function deleteLearnApi(id:string){
    return http.delete<any>(`${Learn.List}/${id}`)
}

