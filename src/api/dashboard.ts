import http from "@/utils/http";
import {DashboardTotalModel,DashboardEchartsModel,DashboardPostModel} from './model/dashboardModel'

enum Dashboard{TOTAL='/dashboard/total',LOGIN='/dashboard/login',POST='/dashboard/post',MESSAGE='/dashboard/message',ACOUNT='/dashboard/acount'}

export function getDashboardTotalApi(){
    return http.get<DashboardTotalModel>(Dashboard.TOTAL)
}

export function getDashboardLoginApi(){
    return http.get<DashboardEchartsModel>(Dashboard.LOGIN)
}

export function getDashboardPostApi(day:string){
    return http.post<DashboardPostModel>(Dashboard.POST,{day})
}
export function getDashboardMessageApi(){
    return http.get<DashboardEchartsModel>(Dashboard.MESSAGE)
}

export function getDashoboardAcountApi(day:string){
    return http.post<DashboardEchartsModel>(Dashboard.POST,{day})
}