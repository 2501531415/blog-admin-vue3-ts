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
                    <img :src="baseUrl + scope.row.avatar_url" alt="" class="m-user-table-img">
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
            <el-table-column label="创建时间">
                <template #default="scope">
                    <span>{{transformUtc(scope.row.updated_time)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
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
        <Dialog :title="dialogStatus?'添加用户':'修改用户'" :DialogVisible="addOrEditUserDialogVisible" width="30%" top="10vh" @cancle="addOrEditUserDialogCancel" @closed="addOrEditUserDialogClosed" @sure="addOrEditUserSubmit">
            <el-form ref="addOrEditUserRef" :model="addOrEditUserForm" label-width="80px" label-position="left"  :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addOrEditUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addOrEditUserForm.password" :show-password="true"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="addOrEditUserForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addOrEditUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="type">
                    <el-select v-model="addOrEditUserForm.type" placeholder="请选择管理员权限">
                        <el-option label="超级管理员" :value="0"></el-option>
                        <el-option label="管理员" :value="1"></el-option>
                        <el-option label="游客" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="头像">
                   <Upload :action="uploadUrl" :headers="uploadHeaders" name="inputFile" @success="uploadSuccess">
                        <template v-if="addOrEditUserForm.avatar_url">
                            <img :src="baseUrl + addOrEditUserForm.avatar_url" alt="" class="m-user-avatar">
                        </template>
                    </Upload>
                </el-form-item>
            </el-form>
        </Dialog>
    </el-card>
</template>

<script setup lang="ts">
    import {reactive,computed,ref, unref} from 'vue'
    import {userListApi,addUserApi,deleteUserApi,editUserApi} from '@/api/user'
    import type {UserList,AddUserParams} from '@/api/model/userModel'
    import type {responseType} from '@/components/element/upload/types'
    import { emailValidate,phoneValidate } from '@/utils/validate'
    import { userStore } from '@/store/modules/user'
    import {messageBox} from '@/components/element/notice/messageBox'
    import {success,error,warning} from '@/components/element/notice/message'
    import Dialog from '@/components/element/dialog/index.vue'
    import Upload from '@/components/element/upload/index.vue'
    import {transformUtc} from '@/lib/dayjs'
    type List = {
        userListTable:UserList[]
    }

    const user = userStore()
    const list = reactive<List>({
        userListTable:[]
    })
    const addOrEditUserForm:AddUserParams = reactive({
        username:'',
        password:'',
        type:null,
        phone:null,
        email:'',
        avatar_url:''
    })
    const searchValue = ref('')
    const userDialogStatus = ref('')
    const addOrEditUserDialogVisible = ref(false)
    const addOrEditUserRef:any = ref(null)
    const EditId = ref('')

    const baseUrl = computed(()=>import.meta.env.VITE_GLOB_IMG_URL)
    const uploadUrl = computed(()=>import.meta.env.VITE_UPLOAD_URL as string)
    const uploadHeaders = computed(()=>{
        return {
            token:user.getToken
        }
    })
    const dialogStatus = computed(()=>unref(userDialogStatus)=='add'?true:false)
    // const a = computed()
    const phoneValid = (rule:any,value:string,callback:(error?:Error)=>void)=>{
        if(phoneValidate(value)){
            callback()
        }else{
            callback(new Error('请输入有效的手机号'))
        }
    }
    const emailValid = (rule:any,value:string,callback:(error?:Error)=>void)=>{
        if(emailValidate(String(value))){
            callback()
        }else{
            callback(new Error('请输入有效的邮箱'))
        }
    }
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
                {required:true,message:'请输入手机号',trigger:'blur'},
                {validator:phoneValid,message:'请输入有效的手机号',trigger:'blur'}
            ],
            email:[
                {required:true,message:'请输入密码',trigger:'blur'},
                {validator:emailValid,message:'请输入有效的邮箱',trigger:'blur'}
            ],
            type:[
                {required:true,message:'请选择权限',trigger:'change'}
            ],
        }

    const getUserList = (query?:string)=>{
        userListApi(query).then(res=>{
            if(res.err_code == 200){
                list.userListTable = res.data
            }
        })
    }
    getUserList()

    const onSearch = ()=>{
        if(unref(searchValue).length == 0) return warning('请输入搜索内容')
        getUserList(unref(searchValue))
    }
    //重置
    const onSearchReset = ()=>{
        searchValue.value = ''
        getUserList()
    }
    //添加管理员
    const addUser = ()=>{
        userDialogStatus.value = 'add'
        addOrEditUserDialogVisible.value = true
    }
    //取消add user dialog
    const addOrEditUserDialogCancel = ()=>{
        addOrEditUserDialogVisible.value = false
        resetAddUserForm()
    }
    //add user dialog close
    const addOrEditUserDialogClosed = ()=>{
        addOrEditUserDialogVisible.value = false
        resetAddUserForm()
    }

    const uploadSuccess = (res:responseType)=>{
        console.log(res)
        addOrEditUserForm.avatar_url = res.url
    }
    //提交添加
    const addOrEditUserSubmit = ()=>{
        unref(addOrEditUserRef).validate((isValid:boolean)=>{
            if(!isValid) return error('请填写必要信息')
            if(unref(dialogStatus)){
                addUserApi(addOrEditUserForm).then(res=>{
                    if(res.err_code != 200) return error(res.message)
                    success('添加成功')
                    addOrEditUserDialogVisible.value = false
                    resetAddUserForm()
                    getUserList()
                })
            }else{
                //edit Api
                editUserApi(unref(EditId),addOrEditUserForm).then(res=>{
                    if(res.err_code != 200) return error(res.message)
                    success('修改成功')
                    addOrEditUserDialogVisible.value = false
                    resetAddUserForm()
                    getUserList()
                })
                
            }   
        })
    }
    //重置表单
    const resetAddUserForm = ()=>{
        unref(addOrEditUserRef).resetFields()
        addOrEditUserForm.username = ''
        addOrEditUserForm.password = ''
        addOrEditUserForm.type = null
        addOrEditUserForm.phone = null
        addOrEditUserForm.email = ''
        addOrEditUserForm.avatar_url = ''
    }
    //修改
    const handleEdit = (scoped:UserList)=>{
        userDialogStatus.value = 'emit'
        EditId.value = scoped._id
        addOrEditUserDialogVisible.value = true
        const {username,password,type,phone, email,avatar_url} = scoped
        addOrEditUserForm.username = username
        addOrEditUserForm.password = password
        addOrEditUserForm.type = type
        addOrEditUserForm.phone = phone
        addOrEditUserForm.email = email
        addOrEditUserForm.avatar_url = avatar_url
        
    }

    //删除
    const handleDelete = (scoped:UserList)=>{
        messageBox('此操作将永久删除该用户, 是否继续?','删除用户',{
            type:'warning',
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            closeOnClickModal:false
        }).then(()=>{
            deleteUserApi(scoped._id).then(res=>{
                if(res.err_code != 200) return error(res.message)
                list.userListTable = list.userListTable.filter(item=>item._id !=scoped._id)
                success('删除成功!')
            })
           
        }).catch(action=>{
            return;
        })
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
        &-table-img{
            width: 69px;
            height: 69px;
        }
        &-pagination{
            margin-top:10px;
            display: flex;
            justify-content: flex-end;
        }
        &-avatar{
            width: 100%;
            height:100%;
        }
    }
</style>