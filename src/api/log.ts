import http from "@/utils/http";
import {LoginLogModel,LogpublicModel} from './model/logModel'

enum Log{LOGIN='/log',LOGINDELETE='/log/login'}
export function getLoginLogApi(){
    return http.get<LoginLogModel>(Log.LOGIN)
}

export function deleteLoginLogApi(list:string[]){
    return http.post<LogpublicModel>(Log.LOGINDELETE,{list})
}