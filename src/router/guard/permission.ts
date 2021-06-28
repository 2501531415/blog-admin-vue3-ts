import type { Router,RouteRecordRaw } from 'vue-router';
import {useUserStoreWithOut} from '@/store/modules/user'
import {pathEnum} from '@/enum/routerEnum'
import {usePermissionWithOut} from '@/store/modules/permission'


export function setupPermission(router:Router){
    router.beforeEach(async (to,from,next)=>{
        const {getToken:token} = useUserStoreWithOut()
        if(token){
            if(to.path == pathEnum.LOGIN_PATH){
                return next(pathEnum.HOME_PATH)
            }
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
            if(to.path == pathEnum.LOGIN_PATH){
                next()
            }else{
                next(pathEnum.LOGIN_PATH)
            }
        }
    })
}