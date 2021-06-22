<template>
    <div>
        <el-button type="primary" @click="login">登录</el-button>
    </div>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router'
    import { permissionStore } from '@/store/modules/permission'
    import {test} from '@/model/test'

    const router = useRouter()

    const permission = permissionStore()

    const login = ()=>{
        permission.login()
        router.push('/')
    }

    test().then(res=>{
        console.log(res)
    })
</script>
