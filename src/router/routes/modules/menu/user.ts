import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const userRoute:MenuRouteRecordRaw = {
    path:'/user',
    component:LAYOUT,
    meta:{title:'用户管理',auth:'admin',icon:'user'},
    redirect:'/user/acount',
    children:[
        {
            path:'/user/acount',
            component:()=>import('@/views/user/index.vue'),
            meta:{title:'账号管理',auth:'admin'}
        },
        {
            path:'/user/loginLog',
            component:()=>import('@/views/user/index.vue'),
            meta:{title:'登录日志',auth:'admin'}
        }
    ]
}

export default userRoute