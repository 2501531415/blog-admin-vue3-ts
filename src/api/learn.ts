import http from '@/utils/http'
import {LearnCategoryModel,LearnCategoryParams,DeleteLearnCategoryModel,EditLearnCategoryModel} from './model/learnModel'

enum LearnCategory{CATEGORY='/learn/nav',ADD='learn/nav',DELETE='/learn/nav'}


export function getLearnCategoryApi(){
    return http.get<LearnCategoryModel>(LearnCategory.CATEGORY)
}


export function addLearnCategoryApi(params:LearnCategoryParams){
    return http.post<EditLearnCategoryModel>(LearnCategory.ADD,params)
}

export function deleteLearnCategoryApi(id:string){
    return http.delete<DeleteLearnCategoryModel>(`${LearnCategory.DELETE}/${id}`)
}
