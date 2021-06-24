import type {RouteRecordRaw} from 'vue-router'
import type {MenuRouteRecordRaw} from '@/router/types'
import {pathEnum} from '@/enum/routerEnum'

//使用import.meta.globEager导入module下所有的路由
const modules = import.meta.globEager('./modules/**/*.ts')

export const menuRoutes:MenuRouteRecordRaw[] = []
Object.keys(modules).forEach(item=>{
    const route = modules[item].default?modules[item].default:{}
    menuRoutes.unshift(route)
});

const loginRoute:RouteRecordRaw = {
    name:'login',
    path:pathEnum.LOGIN_PATH,
    component:()=>import('@/views/system/login/index.vue')
}

const layoutRoute:RouteRecordRaw = {
    name:'layout',
    path:'/',
    component:()=>import('@/layout/index.vue'),
    //redirect:'/user'
}

export const baseRoute:RouteRecordRaw[] = [
    loginRoute,layoutRoute
]