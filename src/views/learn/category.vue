<template>
    <div>
        <CardList :card-list="learn.categoryList" @add="addCategory" @delete="deleteCategory"/>
        <Dialog title="添加分类" :DialogVisible="addCategoryDialogVisible" width="30%" top="10vh" @cancle="addCategoryDialogCancel" @closed="addCategoryDialogClosed" @sure="addCategorySubmit">
            <el-form ref="addCategoryRef" :model="addCategoryForm" label-width="80px" label-position="left"  :rules="rules">
                <el-form-item label="分类名" prop="name">
                    <el-input v-model="addCategoryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-input v-model="addCategoryForm.type"></el-input>
                </el-form-item>
                <el-form-item label="封面" required>
                   <Upload :action="uploadUrl" :headers="uploadHeaders" name="inputFile"  @success="uploadSuccess">
                        <template v-if="addCategoryForm.imgUrl">
                            <img :src="baseUrl + addCategoryForm.imgUrl" alt="" style="width:100%;height:100%">
                        </template>
                    </Upload>
                </el-form-item>
            </el-form>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
    import {ref,reactive,computed} from 'vue'

    import {getLearnCategoryApi,addLearnCategoryApi,deleteLearnCategoryApi} from '@/api/learn'
    import { userStore } from '@/store/modules/user'
    import type {LearnCategoryParams} from '@/api/model/learnModel'
    import type {responseType} from '@/components/element/upload/types'
    import CardList from './components/cardList.vue'
    import Dialog from '@/components/element/dialog/index.vue'
    import Upload from '@/components/element/upload/index.vue'
    import {success,error} from '@/components/element/notice/message'
    import {messageBox} from '@/components/element/notice/messageBox'

    const user = userStore()

    const learn:Record<string,LearnCategoryParams[]> = reactive({
        categoryList:[]
    })

    const addCategoryForm = reactive({
        name:'',
        type:'',
        imgUrl:''
    })

    const addCategoryDialogVisible = ref(false)
    const addCategoryRef:any = ref()

    const baseUrl = computed(()=>import.meta.env.VITE_GLOB_IMG_URL)
    const uploadUrl = computed(()=>import.meta.env.VITE_UPLOAD_URL as string)
    const uploadHeaders = computed(()=>{
        return {
            token:user.getToken
        }
    })

    const rules = {
        name:[
            {required:true,message:'请输入分裂名',trigger:'blur'},
        ],
        type:[
            {required:true,message:'请输入类型',trigger:'change'}
        ],
    }


    const getLearnCategory = ()=>{
        getLearnCategoryApi().then(res=>{
            console.log(res)
            learn.categoryList = res.data
        })
    }

    getLearnCategory()

    const addCategory = ()=>{
        addCategoryDialogVisible.value = true
    }
    //取消dialog
    const addCategoryDialogCancel = ()=>{
        addCategoryDialogVisible.value = false
    }

    //关闭dialog
    const addCategoryDialogClosed = ()=>{
        addCategoryDialogVisible.value = false
    }
    //图片上传success
    const uploadSuccess = (res:responseType)=>{
        addCategoryForm.imgUrl = res.url
    }
    //分类提交
    const addCategorySubmit = ()=>{
        addCategoryRef.value.validate((isValid:boolean)=>{
            if(!isValid) return error('请填写必要内容！')
            if(addCategoryForm.imgUrl.length == 0) return error('请上传封面图片！')
            addLearnCategoryApi(addCategoryForm).then(res=>{
                console.log(res)
                if(res.err_code != 200) error('添加失败！')
                success('添加分类成功！')
                addCategoryDialogVisible.value = false
                addCategoryFormReset()
                getLearnCategory()
            })
            
        })
    }
    //add form reset
    const addCategoryFormReset = ()=>{
        addCategoryRef.value.resetFields()
    }

    //删除
    const deleteCategory = (id:string)=>{
        messageBox('此操作将永久删除该分类, 是否继续?','删除分类',{
            type:'warning',
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            closeOnClickModal:false
        }).then(()=>{
            deleteLearnCategoryApi(id).then(res=>{
                if(res.err_code !=200) return error('删除失败！')
                success('删除成功！')
                learn.categoryList = learn.categoryList.filter(item=>item._id != id)
            })
        })
       
    }
</script>