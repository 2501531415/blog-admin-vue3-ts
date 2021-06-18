import type {RouteRecordRaw} from 'vue-router'

const loginRoute:RouteRecordRaw = {
    name:'login',
    path:'/login',
    component:()=>import('@/views/login/login.vue')
}

const layoutRoute:RouteRecordRaw = {
    name:'layout',
    path:'/',
    component:()=>import('@/layout/container.vue')
}

export const baseRoute:RouteRecordRaw[] = [
    loginRoute,layoutRoute
]