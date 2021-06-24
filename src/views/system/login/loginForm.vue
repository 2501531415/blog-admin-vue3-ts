<template>
    <el-row type="flex" justify="center">
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <div class="m-login-form">
                <div class="m-login-form-title">
                    <span>Hello!</span>
                </div>
                <div class="m-login-form-sub">
                    <span>3334444444444444</span>
                </div>
                <el-form v-module="state.info" :rules="rules">
                    <el-form-item prop="usernmae" label="账号">
                        <el-input type="text" v-model="state.info.username"/>
                    </el-form-item>
                    <el-form-item prop="password" label="密码">
                        <el-input type="password" v-model="state.info.password"/>
                    </el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router'
    import { permissionStore } from '@/store/modules/permission'
    import {test} from '@/api/user'
    import { reactive } from 'vue'
    import type {RuleItem} from 'element-plus'

    const state = reactive({
        info:{
            username:'admin',
            password:'123456'
        }
    })

    // const usernameValid = (rule,value,callback)=>{

    // }
    const rules = {
        username:[
            {required:true,message:'请输入账号',trigger:'blur'},
            {validator:usernameValid,message:'账号长度不少于6个字符',trigger:'blur'}
        ]
    }

    const router = useRouter()

    const permission = permissionStore()

    const login = ()=>{
        permission.login()
        router.push('/')
    }

    // const {data} = await test()
    // console.log(data)
    // test().then(res=>{
    //     console.log(res.token)
    // })
</script>

<style scoped lang="less">
    @name:~'@{namespace}-login-form';
    .@{name}{
        color:#0e121a;
        &-title{
            font-size:50px;
            font-weight: 500;
        }
        &-sub{
            font-size: 36px;
            margin-top: 30px;
        }
    }
</style>
