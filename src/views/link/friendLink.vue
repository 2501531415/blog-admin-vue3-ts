<template>
    <el-card class="m-friends-link">
        <div class="m-friends-link-search">
            <el-row :gutter="20">
                <el-col :xs="12" :sm="12" :md="8" :lg="8">
                    <el-input  prefix-icon="el-icon-search" v-model="searchValue" placeholder="请输入搜索内容"></el-input>
                </el-col>
                <el-col :xs="12" :sm="12" :md="8" :lg="8">
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                    <el-button type="primary" @click="onSearchReset">重置</el-button>
                    <el-button type="primary" @click="addLink">添加友情链接</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="link.friendLink" border empty-text="暂无内容" style="width: 100%">
            <el-table-column label="logo" width="180">
                <template #default="scope">
                    <img :src="baseUrl + scope.row.logo" alt="" class="m-friends-link-table-img">
                </template>
            </el-table-column>
            <el-table-column label="网站名称" prop="name"></el-table-column>
            <el-table-column label="简介" prop="introduce"></el-table-column>
            <el-table-column label="管理者邮箱" prop="poster_email"></el-table-column>
            <el-table-column label="网站类型" prop="type"></el-table-column>
            <el-table-column label="创建时间">
                <template #default="scope">
                    <span>{{transformUtc(scope.row.created_time)}}</span>
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
        <div class="m-friends-link-pagination">
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
        <Dialog :title="dialogStatus?'添加友情链接':'修改友情链接'" :DialogVisible="addOrEditLinkDialogVisible" width="30%" top="10vh" @cancle="addOrEditLinkDialogCancel" @closed="addOrEditLinkDialogClosed" @sure="addOrEditLinkSubmit">
            <el-form ref="addOrEditLinkRef" :model="addOrEditLinkForm" label-width="100px" label-position="left"  :rules="rules">
                <el-form-item label="网站地址" prop="address">
                    <el-input v-model="addOrEditLinkForm.address"></el-input>
                </el-form-item>
                <el-form-item label="网站名称" prop="name">
                    <el-input v-model="addOrEditLinkForm.name"></el-input>
                </el-form-item>
                <el-form-item label="管理者邮箱" prop="poster_email">
                    <el-input v-model="addOrEditLinkForm.poster_email"></el-input>
                </el-form-item>
                <el-form-item label="网站类型" prop="type">
                    <el-select v-model="addOrEditLinkForm.type" placeholder="请选择网站类型">
                        <el-option label="博客" value="博客"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="链接排序" prop="type">
                    <el-select v-model="addOrEditLinkForm.position" placeholder="请选择链接排序">
                        <el-option label="开头" :value="0"></el-option>
                        <el-option label="末尾" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="简介" prop="introduce">
                    <el-input type="textarea" v-model="addOrEditLinkForm.introduce"></el-input>
                </el-form-item>
                <el-form-item label="头像" required>
                    <Upload :action="uploadUrl" :headers="uploadHeaders" name="inputFile" @success="uploadSuccess">
                        <template v-if="addOrEditLinkForm.logo">
                            <img :src="baseUrl + addOrEditLinkForm.logo" alt="" class="m-friends-link-avatar">
                        </template>
                    </Upload>
                </el-form-item>
            </el-form>
        </Dialog>
    </el-card>
</template>

<script setup lang="ts">
    import {reactive,computed,ref, unref} from 'vue'
    import {getFriendsLinkApi,addFriendsLinkApi,editFriendsLinkApi,deleteFriendsLinkApi} from '@/api/flink'
    import {baseUrl,uploadUrl,uploadHeaders} from '@/hooks/useUpload'
    import type {FriendsLinkParams} from '@/api/model/flinkModel'
    import type {responseType} from '@/components/element/upload/types'
    import { emailValidate,addressValidate } from '@/utils/validate'
    import {messageBox} from '@/components/element/notice/messageBox'
    import {success,error,warning} from '@/components/element/notice/message'
    import Dialog from '@/components/element/dialog/index.vue'
    import Upload from '@/components/element/upload/index.vue'
    import {transformUtc} from '@/lib/dayjs'

    const link = reactive<Record<string,FriendsLinkParams[]>>({
        friendLink:[]
    })
    const addOrEditLinkForm = reactive({
        address:'',
        name:'',
        position:1,
        logo:'',
        introduce:'',
        poster_email:'',
        type:'',
    })
    const searchValue = ref('')
    const linkDialogStatus = ref('')
    const addOrEditLinkDialogVisible = ref(false)
    const addOrEditLinkRef:any = ref(null)
    const EditId = ref('')

    const dialogStatus = computed(()=>unref(linkDialogStatus)=='add'?true:false)
    // const a = computed()
    const emailValid = (rule:any,value:string,callback:(error?:Error)=>void)=>{
        if(emailValidate(String(value))){
            callback()
        }else{
            callback(new Error('请输入有效的邮箱'))
        }
    }
    const addressValid = (rule:any,value:string,callback:(error?:Error)=>void)=>{
        if(addressValidate(String(value))){
            callback()
        }else{
            callback(new Error('请输入有效的地址'))
        }
    }
    const rules = {
            address:[
                {required:true,message:'请输入地址',trigger:'blur'},
                {validator:addressValid,message:'请输入有效的地址',trigger:'blur'}
            ],
            name:[
                {required:true,message:'请输入账号',trigger:'blur'},
                {min:5,message:'账号长度不少于5个字符',trigger:'blur'}
            ],
            introduce:[
                {required:true,message:'请输入简介',trigger:'blur'},
            ],
            poster_email:[
                {required:true,message:'请输入管理者邮箱',trigger:'blur'},
                {validator:emailValid,message:'请输入有效的邮箱',trigger:'blur'}
            ],
            type:[
                {required:true,message:'请选择网站类型',trigger:'change'}
            ],
        }

    const getFriendsLink = ()=>{
        getFriendsLinkApi().then(res=>{
            if(res.err_code == 200){
                link.friendLink = res.data
            }
        })
    }
    getFriendsLink()

    const onSearch = ()=>{
        if(unref(searchValue).length == 0) return warning('请输入搜索内容')
        // getUserList(unref(searchValue))
    }
    //重置
    const onSearchReset = ()=>{
        searchValue.value = ''
        // getUserList()
    }
    //添加管理员
    const addLink = ()=>{
        linkDialogStatus.value = 'add'
        addOrEditLinkDialogVisible.value = true
    }
    //取消add user dialog
    const addOrEditLinkDialogCancel = ()=>{
        addOrEditLinkDialogVisible.value = false
        resetAddUserForm()
    }
    //add user dialog close
    const addOrEditLinkDialogClosed = ()=>{
        addOrEditLinkDialogVisible.value = false
        resetAddUserForm()
    }

    const uploadSuccess = (res:responseType)=>{
        console.log(res)
        addOrEditLinkForm.logo = res.url
    }
    //提交添加
    const addOrEditLinkSubmit = ()=>{
        unref(addOrEditLinkRef).validate((isValid:boolean)=>{
            if(!isValid) return error('请填写必要信息')
            if(unref(dialogStatus)){
                addFriendsLinkApi(addOrEditLinkForm).then(res=>{
                    if(res.err_code != 200) return error(res.message)
                    success('添加成功')
                    addOrEditLinkDialogVisible.value = false
                    resetAddUserForm()
                    getFriendsLink()
                })
            }else{
                //edit Api
                editFriendsLinkApi(unref(EditId),addOrEditLinkForm).then(res=>{
                    if(res.err_code != 200) return error(res.message)
                    success('修改成功')
                    addOrEditLinkDialogVisible.value = false
                    resetAddUserForm()
                    getFriendsLink()
                })
                
            }   
        })
    }
    //重置表单
    const resetAddUserForm = ()=>{
        unref(addOrEditLinkRef).resetFields()
        addOrEditLinkForm.name = ''
        addOrEditLinkForm.address = ''
        addOrEditLinkForm.introduce = ''
        addOrEditLinkForm.type = ''
        addOrEditLinkForm.poster_email = ''
        addOrEditLinkForm.logo = ''
    }
    //修改
    const handleEdit = (scoped:Required<FriendsLinkParams>)=>{
        linkDialogStatus.value = 'edit'
        EditId.value = scoped._id
        addOrEditLinkDialogVisible.value = true
        const {name,address,introduce,type, poster_email,logo} = scoped
        addOrEditLinkForm.name = name
        addOrEditLinkForm.address = address
        addOrEditLinkForm.introduce = introduce
        addOrEditLinkForm.type = type
        addOrEditLinkForm.poster_email = poster_email
        addOrEditLinkForm.logo = logo
        
    }

    //删除
    const handleDelete = (scoped:Required<FriendsLinkParams>)=>{
        messageBox('此操作将永久删除该链接, 是否继续?','删除友情链接',{
            type:'warning',
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            closeOnClickModal:false
        }).then(()=>{
            deleteFriendsLinkApi(scoped._id).then(res=>{
                if(res.err_code != 200) return error(res.message)
                link.friendLink = link.friendLink.filter(item=>item._id !=scoped._id)
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
    .m-friends-link{
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