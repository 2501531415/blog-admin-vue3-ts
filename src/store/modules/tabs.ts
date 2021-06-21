import {defineStore} from 'pinia'
import type {TabsMenu} from '@/router/types'
interface tabsState{
    visitRoutes:TabsMenu[]
}

const tabsStore = defineStore({
    id:'tabs',
    state():tabsState{
        return {
            visitRoutes:[]
        }
    },
    actions:{
        addVisitRoute(route:TabsMenu){
            const hasRoute = this.visitRoutes.some((item)=>item.name == route.name)
            if(!hasRoute){
                this.visitRoutes.push(route)
            }
        },
        delVisitRoute(name:string){
            const index = this.visitRoutes.findIndex(item=>item.name == name)
            if(index !== -1){
                this.visitRoutes.splice(index,1)
            }
        },
        delLeftVisitRoute(name:string){
            const index = this.visitRoutes.findIndex(item=>item.name == name)
            if(index !== -1){
                this.visitRoutes.splice(0,index)
            }
        },
        delRightVisitRoute(name:string){
            const index = this.visitRoutes.findIndex(item=>item.name == name) 
            if(index !== -1){
                this.visitRoutes.splice(index,this.visitRoutes.length)
            }
        },
        delAllVisitRoute(){
            this.visitRoutes = []
        }
    }
})