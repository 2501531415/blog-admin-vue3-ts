import http from '@/utils/http'
import {ArticleListModel,ArticlePublicModel} from './model/articleModel'

enum Article{LIST='/article',DELETE='/article'}



export function getArticleListApi(query?:string){
    return http.post<ArticleListModel>(Article.LIST,query)
}


export function deleteArticleApi(id:string){
    return http.delete<ArticlePublicModel>(`${Article.DELETE}/${id}`)
}