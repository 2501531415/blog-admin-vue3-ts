import {defineStore} from 'pinia'
import pinia from '@/store'

interface userState{
    test:number,
    token:null | string,
    role:number
}
export const userStore = defineStore({
    id:'user',
    state():userState{
        return {
            test:333,
            token:null,
            role:2
        }
    },
})

//当不在setup函数中的使用时,需要传入全局的pinia
export function useUserStoreWithOut(){
    return userStore(pinia)
}