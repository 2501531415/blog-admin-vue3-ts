import { createApp } from 'vue'
import App from './App.vue'
import {setupElementUI} from '@/lib/element'
import {setupRouter} from '@/router'
import {setupStore} from '@/store'

(async ()=>{
    const app = createApp(App)

    setupElementUI(app)

    setupStore(app)
    setupRouter(app)

    app.mount('#app')
})()

