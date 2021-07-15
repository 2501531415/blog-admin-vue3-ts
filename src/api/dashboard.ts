import http from "@/utils/http";
import {DashboardTotalModel,DashboardLoginModel} from './model/dashboardModel'

enum Dashboard{TOTAL='/dashboard/total',LOGIN='/dashboard/login'}

export function getDashboardTotalApi(){
    return http.get<DashboardTotalModel>(Dashboard.TOTAL)
}

export function getDashboardLoginApi(){
    return http.get<DashboardLoginModel>(Dashboard.LOGIN)
}