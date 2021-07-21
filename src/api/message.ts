import http from "@/utils/http";

import {MessageModel,MessageDeleteModel} from './model/messageModel'

enum Message{LIST='/message',DELETE='/message/delete'}
export function getMessageApi(page:number,limit:number){
    return http.get<MessageModel>(Message.LIST,{params:{page,limit}})
}

export function deleteMessageApi(list:string){
    return http.post<MessageDeleteModel>(Message.DELETE,{list})
}