import http from "@/utils/http";
import {LoginLogModel,LogpublicModel,LoginLogParams} from './model/logModel'

enum Log{LOGIN='/log',LOGINDELETE='/log/delete'}
export function getLoginLogApi(page:number,limit:number){
    return http.get<LoginLogModel>(Log.LOGIN,{params:{page,limit}})
}

export function deleteLoginLogApi(list:string){
    return http.post<LogpublicModel>(Log.LOGINDELETE,{list})
}