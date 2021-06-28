import { TOKEN_KEY,USERINFO_KEY } from "@/enum/cacheEnum";
import type {UserInfo} from '@/api/user'
import {Cache} from './cache'
interface StorageType{
    [TOKEN_KEY]:string,
    [USERINFO_KEY]:UserInfo,
}

export default new Cache<StorageType>()
