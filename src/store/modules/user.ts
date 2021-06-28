import {defineStore} from 'pinia'
import pinia from '@/store'
import {login} from '@/api/user'
import type {LoginParams,UserInfo} from '@/api/user'
import { TOKEN_KEY,USERINFO_KEY } from '@/enum/cacheEnum'
import cache from '@/utils/cache'

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
            role:0
        }
    },
    getters:{
        getToken():string{
            return this.token || JSON.parse(cache.get(TOKEN_KEY) as string)
        },
        getUserInfo():UserInfo{
            return this.userInfo || JSON.parse(cache.get(USERINFO_KEY) as string)
        }
    },
    actions:{
        async login(params:LoginParams):Promise<UserInfo | null>{
            try{
                const {token,adminInfo} = await login(params)
                this.setUserInfo(adminInfo)
                this.setToken(token)
                return Promise.resolve(adminInfo)
            }catch(err){
                return Promise.reject(err)
            } 
        },
        setToken(token:string){
            this.token = token
            cache.set(TOKEN_KEY,token)
        },
        setUserInfo(info:UserInfo){
            this.userInfo = info
            cache.set(USERINFO_KEY,info)
        },
        cleanToken(){
            this.token = null
            this.userInfo = null
            this.role = 0
            cache.removeAll()
        }
    }
})

//当不在setup函数中的使用时,需要传入全局的pinia
export function useUserStoreWithOut(){
    return userStore(pinia)
}