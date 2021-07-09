import type {RouteRecordRaw} from 'vue-router'
import type {MenuRouteRecordRaw} from '@/router/types'
import {pathEnum} from '@/enum/routerEnum'
import { LAYOUT } from '@/router/constance'
//使用import.meta.globEager导入module下所有的路由
const modules = import.meta.globEager('./modules/**/*.ts')

export const menuRoutes:MenuRouteRecordRaw[] = []
Object.keys(modules).forEach(item=>{
    const route = modules[item].default?modules[item].default:{}
    menuRoutes.unshift(route)
});

export const loginRoute:RouteRecordRaw = {
    name:'login',
    path:pathEnum.LOGIN_PATH,
    meta:{title:'login'},
    component:()=>import('@/views/system/login/index.vue')
}

const layoutRoute:RouteRecordRaw = {
    name:'layout',
    path:'/',
    redirect:'/dashboard',
}

const errorRoute:RouteRecordRaw = {
    name:'404',
    path:'/404',
    component:()=>import('@/views/system/error/404.vue')
}

export const unKnownRoute:MenuRouteRecordRaw = {
    name:'error',
    path:'/:pathMatch(.*)*',
    component:LAYOUT,
    meta:{title:'error',auth:'admin'},
    children:[
        {
            name:'error',
            path:'/:pathMatch(.*)*',
            component:()=>import('@/views/system/error/404.vue'),
            meta:{title:'error',auth:'admin'},
        }
    ]
}

export const baseRoute:RouteRecordRaw[] = [
    loginRoute,layoutRoute,errorRoute
]