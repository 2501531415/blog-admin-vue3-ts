import {defineStore} from 'pinia'
import pinia from '@/store'
import {login} from '@/api/user'
import type {LoginParams,UserInfo} from '@/api/user'

interface userState{
    userInfo:UserInfo | null,
    token:null | string,
    role:number
}
export const userStore = defineStore({
    id:'user',
    state():userState{
        return {
            userInfo:null,
            token:null,
            role:2
        }
    },
    actions:{
        async login(params:LoginParams){
            const {token,adminInfo} = await login(params)
            this.userInfo = adminInfo
            this.setToken(token)
        },
        setToken(token:string){
            this.token = token
        },
        cleanToken(){
            this.token = null
        }
    }
})

//当不在setup函数中的使用时,需要传入全局的pinia
export function useUserStoreWithOut(){
    return userStore(pinia)
}