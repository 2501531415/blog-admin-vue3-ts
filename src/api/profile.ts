import http from '@/utils/http'
import {IntroduceModel, IntroduceParams,IntroducePublicModel} from './model/profileModel'

enum Introduce{GET='/introduce',EDIT='/introduce/update'}

export function getIntroduceApi(){
    return http.get<IntroduceModel>(Introduce.GET)
}

export function editIntroduceApi(params:IntroduceParams){
    return http.put<IntroducePublicModel>(Introduce.EDIT,params)
}