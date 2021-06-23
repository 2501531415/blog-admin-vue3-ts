import axios from "axios";
import qs from 'qs'
import type {AxiosRequestConfig,AxiosResponse,AxiosInstance} from 'axios'

class Http{
    public instance:AxiosInstance
    constructor(){
        this.instance = axios.create({
            baseURL:'http://blog.wmyy.fun/api/v2',
            timeout:5000
        })
        this.setupInterceptor()
    }
    setupInterceptor(){
        this.instance.interceptors.request.use((config:AxiosRequestConfig):AxiosRequestConfig=>{
            config.data = qs.stringify(config.data)
            //add token
            return config
        })

        this.instance.interceptors.response.use((res:AxiosResponse):AxiosResponse=>{
            console.log(res)
            //if error show error message
            return res
        })
    }
    get<T>(url:string,config?:AxiosRequestConfig):Promise<T>{
        return new Promise((resolve,reject)=>{
            this.instance.get<T>(url,config).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    post<T>(url:string,data?:any,config?:AxiosRequestConfig):Promise<T>{
        return new Promise((resolve,reject)=>{
            this.instance.post<T>(url,data,config).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}

export default new Http()
