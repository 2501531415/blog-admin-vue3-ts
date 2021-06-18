import type {App} from 'vue'
import {createRouter,createWebHashHistory} from 'vue-router'
import {baseRoute} from './routes'


const router = createRouter({
    routes:baseRoute,
    history:createWebHashHistory()
})

export function setupRouter(app:App){
    app.use(router)
}

export default router