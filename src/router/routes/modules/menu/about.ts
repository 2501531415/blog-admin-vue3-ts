import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const userRoute:MenuRouteRecordRaw = {
    path:'/about',
    component:LAYOUT,
    meta:{title:'关于',auth:'admin',icon:'warning-outline',isHide:true},
    redirect:'/about/index',
    orderNo:50,
    children:[
        {
            path:'index',
            component:()=>import('@/views/about/index.vue'),
            meta:{title:'关于',auth:'admin'}
        }
    ]
}

export default userRoute