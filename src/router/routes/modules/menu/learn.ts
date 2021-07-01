import type {MenuRouteRecordRaw} from '@/router/types'
import { LAYOUT } from '@/router/constance'

export const learnRoute:MenuRouteRecordRaw = {
    path:'/learn',
    component:LAYOUT,
    meta:{title:'学习管理',auth:['admin','user'],icon:'notebook-1'},
    redirect:'/learn/manage',
    orderNo:20,
    children:[
        {
            path:'/learn/manage',
            component:()=>import('@/views/learn/manage.vue'),
            meta:{title:'笔记管理',auth:'admin'}
        },
        {
            path:'/learn/add',
            component:()=>import('@/views/learn/add.vue'),
            meta:{title:'笔记添加',auth:['admin','user']}
        },
        {
            path:'/learn/category',
            component:()=>import('@/views/learn/category.vue'),
            meta:{title:'笔记分类',auth:['admin','user']}
        }
    ]
}

export default learnRoute