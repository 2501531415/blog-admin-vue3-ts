import { publicModel } from "./index";

export interface FriendsLinkParams{
    address:string,
    name:string,
    position:number,
    logo:string,
    introduce:string,
    poster_email:string,
    type:string,
    _id?:string,
    created_time?:string
}

export interface FriendsLinkModel extends publicModel{
    data:FriendsLinkParams[]
}