import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const logRoute:MenuRouteRecordRaw = {
    path:'/log',
    component:LAYOUT,
    meta:{title:'日志管理',auth:'admin',icon:'chat-line-round'},
    redirect:'/log/login',
    orderNo:20,
    children:[
        {
            path:'/log/login',
            component:()=>import('@/views/log/login.vue'),
            meta:{title:'登录日志',auth:'admin'}
        }
    ]
}

export default logRoute