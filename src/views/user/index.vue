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
                    <el-button type="primary" @click="onSearchReset">添加管理员</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list.userListTable" border style="width: 100%">
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
    </el-card>
</template>

<script setup lang="ts">
    import {reactive,computed,ref} from 'vue'
    import {userList} from '@/api/user'
    import type {UserList} from '@/api/model/userModel'

    type List = {
        userListTable:UserList[]
    }
    const list = reactive<List>({
        userListTable:[]
    })
    const searchValue = ref('')
    userList().then(res=>{
        if(res.err_code == 200){
            list.userListTable = res.data
        }
    })

    const baseUrl = computed(()=>import.meta.env.VITE_GLOB_IMG_URL)

    const onSearch = ()=>{
        console.log(searchValue.value)
    }
    //重置
    const onSearchReset = ()=>{
        searchValue.value = ''
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