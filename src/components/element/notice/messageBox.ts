import { ElMessageBox} from "element-plus";
import {ElMessageBoxOptions} from 'element-plus/lib/el-message-box/src/message-box.type'

export function messageBox(message:string,title:string,option:ElMessageBoxOptions){
    return ElMessageBox.confirm(message,title,option)
}

// export function message