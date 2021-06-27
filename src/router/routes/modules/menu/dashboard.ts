import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const articleRoute:MenuRouteRecordRaw = {
    path:'/dashboard',
    component:LAYOUT,
    meta:{title:'Dashboard',auth:['admin','user'],icon:'odometer'},
    redirect:'/dashboard/index',
    orderNo:10,
    children:[
        {
            path:'/dashboard/index',
            component:()=>import('@/views/dashboard/index.vue'),
            meta:{title:'分析页',auth:['admin','user'],closable:false}
        },
    ]
}

export default articleRoute