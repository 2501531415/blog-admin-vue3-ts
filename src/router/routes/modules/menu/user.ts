import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const userRoute:MenuRouteRecordRaw = {
    path:'/user',
    component:LAYOUT,
    meta:{title:'用户管理',auth:'admin',icon:'user'},
    redirect:'/user/acount',
    orderNo:20,
    children:[
        {
            path:'/user/acount',
            component:()=>import('@/views/user/index.vue'),
            meta:{title:'账号管理',auth:'admin'}
        }
    ]
}

export default userRoute