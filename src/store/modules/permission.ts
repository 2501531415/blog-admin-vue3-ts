import { defineStore } from "pinia";
import pinia from '@/store'
import {menuRoutes} from '@/router/routes'
import { userStore } from "./user";
import {Role} from '@/enum/permissionEnum'
import type {MenuRouteRecordRaw} from '@/router/types'

interface PermissionState{
    allowRoutes:MenuRouteRecordRaw[],
    isRouterAdd:Boolean
}
export const permissionStore = defineStore({
    id:'permission',
    state():PermissionState{
        return {
            allowRoutes:[],
            isRouterAdd:false
        }
    },
    actions:{
        async login(){
            const user = userStore()
            user.$patch((state)=>{
                state.token = '6666',
                state.role = 0
            })
        },
        getAllowRoutes(){
            const routes = this.transformRoute(menuRoutes)
            this.allowRoutes = routes
            return routes
        },
        transformRoute(routes:MenuRouteRecordRaw[]){
            const {role} = userStore()
            const roleName = Role[role]
            let allRoutes:MenuRouteRecordRaw[] = []
            routes.forEach(route=>{
                if(route.meta.auth.includes(roleName) || route.meta.auth == roleName){
                    if(route.children){
                        const arr = this.transformRoute(route.children)
                        route.children = arr
                    }
                    allRoutes.push(route)
                }
            })
            return allRoutes    
        },
        setIsRouteAdd(add:Boolean){
            this.isRouterAdd = add
        }
    }
    
})

export function usePermissionWithOut(){
    return permissionStore(pinia)
}