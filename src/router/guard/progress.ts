import type {Router} from 'vue-router'
import nprogress from '@/lib/nprogress'

export function setupProgressBar(router:Router){
    router.beforeEach(()=>{
        nprogress.start()
    })
    router.afterEach(()=>{
        nprogress.done()
    })
}