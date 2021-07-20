import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const messageRoute:MenuRouteRecordRaw = {
    path:'/message',
    component:LAYOUT,
    meta:{title:'留言管理',auth:['admin'],icon:'message',isHide:true},
    redirect:'/message/index',
    orderNo:20,
    children:[
        {
            path:'/message/index',
            component:()=>import('@/views/message/index.vue'),
            meta:{title:'留言管理',auth:['admin']}
        },
    ]
}

export default messageRoute