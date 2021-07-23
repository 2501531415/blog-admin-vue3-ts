import { publicModel } from "./index";

export interface FriendsLinkParams{
    address:string,
    name:string,
    position:number,
    logo:string,
    introdute:string,
    poster_email:string,
    type:string
}

export interface FriendsLinkModel extends publicModel{
    data:FriendsLinkParams[]
}