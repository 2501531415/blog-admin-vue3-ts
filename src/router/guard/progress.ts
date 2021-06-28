import type {Router} from 'vue-router'
import nprogress from '@/lib/nprogress'

export function setupProgressBar(router:Router){
    router.beforeEach(()=>{
        console.log('progress')
        nprogress.start()
    })
    router.afterEach(()=>{
        nprogress.done()
    })
}