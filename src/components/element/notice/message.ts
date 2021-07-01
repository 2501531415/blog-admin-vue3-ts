import {ElMessage} from 'element-plus'
import {IMessageOptions} from 'element-plus/lib/el-message/src/types'

export function message(options:IMessageOptions){
    return ElMessage(options)
}

export function success(message:string){
    return ElMessage.success(message)
}

export function error(message:string){
    return ElMessage.error(message)
}

export function warning(message:string){
    return ElMessage.warning(message)
}