import {request} from '@/utils/http'

export function test(){
    return request({
        url:'/login',
        method:'post',
        data:{
            username:'admin',
            password:'123456'
        }
    })
}