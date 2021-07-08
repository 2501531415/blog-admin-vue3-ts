import { createApp } from 'vue'
import App from './App.vue'
import {setupElementUI} from '@/lib/element'
import {setupRouter} from '@/router'
import {setupStore} from '@/store'
import {setupRouterGuard} from '@/router/guard'
import {setupHighlight} from '@/lib/highlight'
import router from '@/router'

//css
import '@/style/index.less'
//nprogress
import 'nprogress/nprogress.css'

import 'highlight.js/styles/atom-one-light.css'

(async ()=>{
    const app = createApp(App)

    setupElementUI(app)
    setupHighlight(app)
    setupStore(app)
    
    setupRouter(app)

    setupRouterGuard(router)

    app.mount('#app')
})()

