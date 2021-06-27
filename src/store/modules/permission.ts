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
    getters:{
        sortAllowRoutes():MenuRouteRecordRaw[]{
            return this.allowRoutes.sort((obj1:MenuRouteRecordRaw,obj2:MenuRouteRecordRaw):number=>{
                const a = obj1.orderNo as number
                const b = obj2.orderNo as number
                return a -b
            })
        }
    },
    actions:{
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
        },
        getParentList(path:string){
            const list:string[] = []
            this.allowRoutes.forEach(item=>{
                if(item.children){
                    const child = item.children.filter(item=>item.path == path)
                    if(child.length > 0 && !item.meta.isHide){
                        list.push(...[item.meta.title,child[0].meta.title])
                    }else if(child.length > 0){
                        list.push(child[0].meta.title)
                    }
                }
            })
            return list
        }
    }
    
})

export function usePermissionWithOut(){
    return permissionStore(pinia)
}