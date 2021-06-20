import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const userRoute:MenuRouteRecordRaw = {
    path:'/learn',
    component:LAYOUT,
    meta:{title:'学习管理',auth:['admin','user'],icon:'eleme'},
    redirect:'/learn/look',
    children:[
        {
            path:'/learn/look',
            component:()=>import('@/views/learn/index.vue'),
            meta:{title:'文章查看',auth:['admin','user']}
        },
        {
            path:'/learn/add',
            component:()=>import('@/views/learn/index.vue'),
            meta:{title:'文章添加',auth:['admin','user']}
        },
        {
            path:'/learn/edit',
            component:()=>import('@/views/learn/index.vue'),
            meta:{title:'文章修改',auth:'admin'}
        }
    ]
}

export default userRoute