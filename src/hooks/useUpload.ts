import {computed} from 'vue'
import {useUserStoreWithOut} from '@/store/modules/user'

const baseUrl = computed(()=>import.meta.env.VITE_GLOB_IMG_URL)
const uploadUrl = computed(()=>import.meta.env.VITE_UPLOAD_URL as string)
const uploadHeaders = computed(()=>{
    return {
        token:useUserStoreWithOut().getToken
    }
})

export {
    baseUrl,uploadUrl,uploadHeaders
}

