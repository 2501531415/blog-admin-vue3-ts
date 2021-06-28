import {setupPermission} from './permission'
import {setupProgressBar} from './progress'
import type {Router} from 'vue-router'

export function setupRouterGuard(router:Router){
    setupPermission(router)
    setupProgressBar(router)
}