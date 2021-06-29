<template>
    <el-card class="m-user">
        <div class="m-user-search">
            <el-row :gutter="20">
                <el-col :xs="12" :sm="12" :md="8" :lg="8">
                    <el-input  prefix-icon="el-icon-search" v-model="searchValue" placeholder="请输入搜索内容"></el-input>
                </el-col>
                <el-col :xs="12" :sm="12" :md="8" :lg="8">
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                    <el-button type="primary" @click="onSearchReset">重置</el-button>
                    <el-button type="primary" @click="addUser">添加管理员</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list.userListTable" border empty-text="无用户内容" style="width: 100%">
            <el-table-column label="头像" width="180">
                <template #default="scope">
                    <img :src="baseUrl + scope.row.avatar_url" alt="">
                </template>
            </el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="权限" prop="type">
                <template #default="scope">
                    <el-tag effect="dark" :type="scope.row.type == 0?'danger':''"><span>{{scope.row.type == 0?'超级管理员':'管理员'}}</span></el-tag>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="updated_time"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="m-user-pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="100"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
        <Dialog title="添加管理员" :DialogVisible="addUserDialogVisible" width="30%" @cancle="addUserDialogCancel" @closed="addUserDialogClosed" @sure="addUserSubmit">
            <el-form :model="addUserForm" label-width="80px" label-position="left" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUserForm.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="addUserForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="addUserForm.type" placeholder="请选择管理员权限">
                        <el-option label="超级管理员" value="0"></el-option>
                        <el-option label="管理员" value="1"></el-option>
                        <el-option label="游客" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </Dialog>
    </el-card>
</template>

<script setup lang="ts">
    import {reactive,computed,ref, unref} from 'vue'
    import {userListApi,addUserApi} from '@/api/user'
    import {ElMessage} from 'element-plus'
    import Dialog from '@/components/element/dialog/index.vue'
    import type {UserList,AddUserParams} from '@/api/model/userModel'

    type List = {
        userListTable:UserList[]
    }
    const list = reactive<List>({
        userListTable:[]
    })
    const addUserForm = reactive({
        username:'',
        password:'',
        type:'',
        phone:'',
        email:'',
        avatar_url:''
    })
    const searchValue = ref('')
    const addUserDialogVisible = ref(false)

    const rules = {
            username:[
                {required:true,message:'请输入账号',trigger:'blur'},
                {min:5,message:'账号长度不少于5个字符',trigger:'blur'}
            ],
            password:[
                {required:true,message:'请输入密码',trigger:'blur'},
                {min:6,message:'密码长度不少于6个字符',trigger:'blur'}
            ],
            phone:[
                {required:true,message:'请输入账号',trigger:'blur'},
                {min:11,message:'请输入有效的手机号',trigger:'blur'}
            ],
            email:[
                {required:true,message:'请输入密码',trigger:'blur'},
                {min:11,message:'请输入有效的邮箱',trigger:'blur'}
            ]
        }
    
    const baseUrl = computed(()=>import.meta.env.VITE_GLOB_IMG_URL)

    const getUserList = (query?:string)=>{
        userListApi(query).then(res=>{
            if(res.err_code == 200){
                list.userListTable = res.data
            }
        })
    }
    getUserList()

    const onSearch = ()=>{
        if(unref(searchValue).length == 0) return ElMessage.warning('请输入搜索内容')
        getUserList(unref(searchValue))
    }
    //重置
    const onSearchReset = ()=>{
        searchValue.value = ''
        getUserList()
    }
    //添加管理员
    const addUser = ()=>{
        addUserDialogVisible.value = true
    }
    //取消add user dialog
    const addUserDialogCancel = ()=>{
        addUserDialogVisible.value = false
    }
    //add user dialog close
    const addUserDialogClosed = ()=>{
        addUserDialogVisible.value = false
    }
    const addUserSubmit = ()=>{
        addUserApi(addUserForm)
    }
    //修改
    const handleEdit = (index:number,scoped:UserList)=>{
        console.log(index)
        console.log(scoped)
    }

    //删除
    const handleDelete = (index:number,scoped:UserList)=>{
        console.log(index)
        console.log(scoped)
    }
    //分页
    const handleSizeChange = ()=>{

    }

    const handleCurrentChange = ()=>{

    }
</script>

<style scoped lang="less">
    .m-user{
        min-height: calc(100vh - 205px);
        &-search{
            margin-bottom: 10px;
        }
        img{
            width: 69px;
            height: 69px;
        }
        &-pagination{
            margin-top:10px;
            display: flex;
            justify-content: flex-end;
        }
    }
</style>