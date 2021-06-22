import axios from "axios";
// import qs from 'qs'
import type {AxiosRequestConfig,AxiosResponse} from 'axios'

export function request(config:AxiosRequestConfig){
    const instance = axios.create({
        baseURL:'http://blog.wmyy.fun/api/v2',
        timeout:5000
    })

    instance.interceptors.request.use((config:AxiosRequestConfig):AxiosRequestConfig=>{
        return config
    })

    instance.interceptors.response.use((res:AxiosResponse):AxiosResponse=>{
        return res.data
    })

    return instance(config)
}