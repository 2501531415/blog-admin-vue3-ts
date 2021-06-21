import type {RouteRecordRaw} from 'vue-router'
type Meta = {
    title:string,
    auth:string[] | string,
    icon?:string
}

//重写meta的类型
export interface MenuRouteRecordRaw extends Omit<RouteRecordRaw,'meta'|'children'>{
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
    closable:boolean,
}
