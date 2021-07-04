import http from '@/utils/http'
import {LearnCategoryModel,LearnCategoryParams,DeleteLearnCategoryModel,EditLearnCategoryModel,LearnParams} from './model/learnModel'

enum LearnCategory{CATEGORY='/learn/nav',ADD='learn/nav',DELETE='/learn/nav'}

enum Learn{ADD='/learn/add'}


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
    return http.post<any>(Learn.ADD,params)
}