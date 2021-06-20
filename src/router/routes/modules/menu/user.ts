import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const userRoute:MenuRouteRecordRaw = {
    path:'/user',
    component:LAYOUT,
    meta:{title:'用户管理',auth:'admin'},
    redirect:'/user/index',
    children:[
        {
            path:'/user/index',
            component:()=>import('@/views/user/index.vue'),
            meta:{title:'账号管理',auth:'admin'}
        }
    ]
}

export default userRoute