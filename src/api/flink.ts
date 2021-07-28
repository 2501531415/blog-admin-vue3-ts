import http from "@/utils/http";
import { FriendsLinkModel,FriendsLinkParams} from "./model/flinkModel";
import { publicModel } from "./model";

enum FriendsLink{LIST='/link',ADD='/link/add',EDIT='/link/update',DELETE='/link/delete'}

export function getFriendsLinkApi(){
    return http.get<FriendsLinkModel>(FriendsLink.LIST)
}

export function addFriendsLinkApi(params:FriendsLinkParams){
    return http.post<publicModel>(FriendsLink.ADD,params)
}

export function editFriendsLinkApi(id:string,params:FriendsLinkParams){
    return http.post<publicModel>(`${FriendsLink.EDIT}/${id}`,params)
}

export function deleteFriendsLinkApi(id:string){
    return http.post<publicModel>(`${FriendsLink.DELETE}/${id}`)
}