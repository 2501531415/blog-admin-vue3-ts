import http from "@/utils/http";
import {DashboardTotalModel} from './model/dashboardModel'

enum Dashboard{total='/dashboard/total'}

export function getDashboardTotalApi(){
    return http.get<DashboardTotalModel>(Dashboard.total)
}