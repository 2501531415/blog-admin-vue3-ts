export class Cache<T=any>{
    constructor(){

    }
    get(key:keyof T):string | null{
        return sessionStorage.getItem(key as string)
    }
    set(key:keyof T,value:any):void{
        sessionStorage.setItem(key as string,JSON.stringify(value))
    }
    remove(key:keyof T):void{
        sessionStorage.removeItem(key as string)
    }
    removeAll():void{
        sessionStorage.clear()
    }
}