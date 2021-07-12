import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const profileRoute:MenuRouteRecordRaw = {
    path:'/profile',
    component:LAYOUT,
    meta:{title:'个人中心',auth:['admin','user'],icon:'s-custom',isHide:true},
    redirect:'/profile/index',
    orderNo:20,
    children:[
        {
            path:'/profile/index',
            component:()=>import('@/views/profile/index.vue'),
            meta:{title:'个人中心',auth:['admin','user']}
        },
    ]
}

export default profileRoute