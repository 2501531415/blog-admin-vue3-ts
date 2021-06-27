import router from '@/router'
import type { Router,RouteRecordRaw } from 'vue-router';
import {useUserStoreWithOut} from '@/store/modules/user'
import {pathEnum} from '@/enum/routerEnum'
import {usePermissionWithOut} from '@/store/modules/permission'


export function permission(router:Router){
    router.beforeEach(async (to,from,next)=>{
        const {token} = useUserStoreWithOut()
        if(to.path == pathEnum.LOGIN_PATH){
            next()
        }else{
            if(token){
                //取权限路由
                const {getAllowRoutes,isRouterAdd,setIsRouteAdd} = usePermissionWithOut()

                if(isRouterAdd){
                    return next()
                }
                const allowRoutes = await getAllowRoutes()
                allowRoutes.forEach(route=>{
                    router.addRoute((route as unknown) as RouteRecordRaw)
                })
                setIsRouteAdd(true)
                next({path:to.path})
            }else{
                next(pathEnum.LOGIN_PATH)
            }
        }
    })
}