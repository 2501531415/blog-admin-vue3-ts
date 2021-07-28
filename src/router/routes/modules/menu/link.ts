import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const linkRoute:MenuRouteRecordRaw = {
    path:'/link',
    component:LAYOUT,
    meta:{title:'链接管理',auth:['admin','user'],icon:'link'},
    redirect:'/link/friends',
    orderNo:20,
    children:[
        {
            path:'/link/friends',
            component:()=>import('@/views/link/friendLink.vue'),
            meta:{title:'友情链接',auth:['admin','user']}
        }
    ]
}

export default linkRoute