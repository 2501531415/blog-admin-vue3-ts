<template>
    <el-row type="flex" justify="center">
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <div class="m-login-form">
                <div class="m-login-form-title">
                    <span>Hello!</span>
                </div>
                <div class="m-login-form-sub">
                    <span>欢迎来到m-blog!</span>
                </div>
                <el-form ref="loginForm" :model="state.info" :rules="state.rules">
                    <el-form-item prop="username">
                        <el-input  v-model="state.info.username" clearable prefix-icon="el-icon-user"/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="state.info.password" show-password clearable prefix-icon="el-icon-lock"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router'
    import { userStore } from '@/store/modules/user'
    import { reactive,ref } from 'vue'
    import { ElMessage,ElNotification } from 'element-plus'

    const router = useRouter()
    const user = userStore()

    const state = reactive({
        info:{
            username:'zwmzyy',
            password:'123456'
        },
        rules:{
            username:[
                {required:true,message:'请输入账号',trigger:'blur'},
                {min:5,message:'账号长度不少于5个字符',trigger:'blur'}
            ],
            password:[
                {required:true,message:'请输入密码',trigger:'blur'},
                {min:6,message:'密码长度不少于6个字符',trigger:'blur'}
            ]
        }
    })

    const loginForm:any = ref(null)
    const loading = ref(false)

    const login = ()=>{
        loading.value = true
        loginForm.value.validate(async (isValid:Boolean)=>{
            if(!isValid) return alert('error')
            const userInfo = await user.login(state.info)
            loading.value = false
            if(userInfo){
                await router.replace('/dashboard')
                ElNotification({
                    type:'success',
                    title:'登录成功',
                    message:`${userInfo.username},欢迎回来！`
                })
            }else{
                ElMessage.error('登录失败！')
            }
        })
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
            font-size:56px;
            font-weight: 500;
        }
        &-sub{
            font-size: 26px;
            margin:30px 0px;
        }
        .el-button{
            width:100%;
            height:52px;
        }
    }
</style>
