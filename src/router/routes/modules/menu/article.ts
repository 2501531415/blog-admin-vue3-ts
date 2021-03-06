import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const articleRoute:MenuRouteRecordRaw = {
    path:'/article',
    component:LAYOUT,
    meta:{title:'文章管理',auth:['admin','user'],icon:'reading'},
    redirect:'/article/manage',
    orderNo:20,
    children:[
        {
            path:'/article/manage',
            component:()=>import('@/views/article/manage.vue'),
            meta:{title:'文章整理',auth:'admin'}
        },
        {
            path:'/article/manage/:id',
            component:()=>import('@/views/article/articleForm.vue'),
            meta:{title:'文章修改',auth:'admin',isHide:true}
        },
        {
            path:'/article/add',
            component:()=>import('@/views/article/articleForm.vue'),
            meta:{title:'文章添加',auth:['admin','user']}
        }
    ]
}

export default articleRoute