import http from '@/utils/http'
import {ArticleListModel,ArticlePublicModel,ArticleParams,ArticleDetailModel} from './model/articleModel'

enum Article{LIST='/article',DELETE='/article',ADD='/article/add',DETAIL='/article/detail'}



export function getArticleListApi(query?:string){
    return http.post<ArticleListModel>(Article.LIST,query)
}


export function deleteArticleApi(id:string){
    return http.delete<ArticlePublicModel>(`${Article.DELETE}/${id}`)
}

export function addArticleApi(params:ArticleParams){
    return http.post<ArticlePublicModel>(Article.ADD,params)
}

export function getArticleDetailApi(id:string){
    return http.get<ArticleDetailModel>(`${Article.DETAIL}/${id}`)
}