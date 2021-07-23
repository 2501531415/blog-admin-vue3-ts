import http from "@/utils/http";
import { FriendsLinkModel,FriendsLinkParams} from "./model/flinkModel";
import { publicModel } from "./model";

enum FriendsLink{LIST='/friends',ADD='/friends/add',EDIT    ='/friends/update',DELETE='/friends/delete'}

export function getFriendsLink(){
    http.get<FriendsLinkModel>(FriendsLink.LIST)
}

export function addFriendsLink(params:FriendsLinkParams){
    http.post<publicModel>(FriendsLink.ADD,params)
}

export function editFriendsLink(id:string,params:FriendsLinkParams){
    http.post<publicModel>(`${FriendsLink.EDIT}/${id}`,params)
}

export function deleteFriendsLink(id:string){
    http.post<publicModel>(`${FriendsLink.DELETE}/${id}`)
}