import http from "@/utils/http";
import {DashboardTotalModel,DashboardEchartsModel,DashboardPostModel} from './model/dashboardModel'

enum Dashboard{TOTAL='/dashboard/total',LOGIN='/dashboard/login',POST='/dashboard/post',MESSAGE='/dashboard/message'}

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