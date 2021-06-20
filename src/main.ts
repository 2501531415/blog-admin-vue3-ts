import { createApp } from 'vue'
import App from './App.vue'
import {setupElementUI} from '@/lib/element'
import {setupRouter} from '@/router'
import {setupStore} from '@/store'
import {permission} from '@/router/guard/permission'
import router from '@/router'

//css
import '@/style/index.less' 

(async ()=>{
    const app = createApp(App)
    permission(router)
    setupElementUI(app)

    setupStore(app)
    
    setupRouter(app)

    app.mount('#app')
})()

