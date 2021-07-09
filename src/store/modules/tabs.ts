import {defineStore} from 'pinia'
import {unKnownRoute,loginRoute} from '@/router/routes'
import type {TabsMenu} from '@/router/types'
interface tabsState{
    visitRoutes:TabsMenu[]
}

export const tabsStore = defineStore({
    id:'tabs',
    state():tabsState{
        return {
            visitRoutes:[],
            // breadcrumbs:[]
        }
    },
    actions:{
        addVisitRoute(route:TabsMenu){
            if(route.name == unKnownRoute.name || route.name == loginRoute.name){
                return;
            }
            const hasRoute = this.visitRoutes.some((item)=>item.path == route.path)
            if(!hasRoute){
                this.visitRoutes.push(route)
            }
            console.log(this.visitRoutes)
        },
        delVisitRoute(path:string){
            const index = this.visitRoutes.findIndex(item=>item.path == path)
            if(index !== -1){
                this.visitRoutes.splice(index,1)
            }
        },
        delLeftVisitRoute(path:string){
            const index = this.visitRoutes.findIndex(item=>item.path == path)
            if(index !== -1){
                this.visitRoutes.splice(0,index)
            }
        },
        delRightVisitRoute(path:string){
            const index = this.visitRoutes.findIndex(item=>item.path == path) 
            if(index !== -1){
                this.visitRoutes.splice(index+1,this.visitRoutes.length)
            }
        },
        delOtherVisitRoute(path:string){
            this.visitRoutes = this.visitRoutes.filter(item=>item.path == path)
        },
        delAllVisitRoute(){
            this.visitRoutes = []
        }
    }
})