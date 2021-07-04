<template>
    <drop-down :DropDownItem="state.dropItem" @menuClick="menuClick">
        <template #title>
           <div class="m-login-info">
                <img :src="baseUrl+avatar" alt="">
                <span>
                    {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
           </div>
        </template>
    </drop-down>
</template>

<script setup lang="ts">
    import {userStore} from '@/store/modules/user'

    import {computed,reactive} from 'vue'
    import {useRouter} from 'vue-router'

    import DropDown from '@/components/element/dropdown/index.vue'

    const user = userStore()
    const router = useRouter()

    const state = reactive({
        dropItem:[{name:'退出登录',command:'login',icon:'el-icon-user'}]
    })

    const avatar = computed(()=>user.getUserInfo?.avatar)
    const username = computed(()=>user.getUserInfo?.username)
    const baseUrl = computed(()=>import.meta.env.VITE_GLOB_IMG_URL)

    const menuClick = (command:string)=>{
        switch(command){
            case 'login':
            logout()
            break;
        }
    }

    const logout = ()=>{
        user.cleanToken()
        router.push('/login')
    }


</script>

<style scoped lang="less">
@name:~'@{namespace}-login-info';
.flex(flex){
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.@{name}{
    .flex(flex);
    img{
        width:40px;
        height:40px;
        border-radius: 40px;
    }
    span{
        margin-left:5px;
    }
}
    
</style>