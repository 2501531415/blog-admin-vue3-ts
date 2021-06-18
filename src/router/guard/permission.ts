import router from '@/router'
import type { Router } from 'vue-router';

export function permission(router:Router){
    router.beforeEach((to,from,next)=>{
        if(to.path == '/login'){
            next()
        }else{
            if(token){
                //取权限路由
                next()
            }else{
                next('/login')
            }
        }
    })
}