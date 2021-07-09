import type {RouteRecordRaw} from 'vue-router'
export type Meta = {
    title:string,
    auth:string[] | string,
    icon?:string,
    isHide?:Boolean
    closable?:boolean,
    affix?:boolean
}

//重写meta的类型
export interface MenuRouteRecordRaw extends Omit<RouteRecordRaw,'meta'|'children'>{
    orderNo?:number,
    meta:Meta,
    children?:MenuRouteRecordRaw[]
}

interface MenuType{
    meta:Meta,
    path:string,
    name:string,
    children?:MenuType
}

//tabs
export interface TabsMenu{
    name:string,
    path:string,
    closable?:boolean,
    meta:Meta
}
