<template>
    <div class="m-article-add">
        <div class="m-article-add-submit">
            <el-button type="primary" size="small" @click="backToManage" v-if="isEdit">返回主界面</el-button>
            <el-button type="primary" size="small" @click="addToDraft">草稿箱</el-button>
            <el-button type="primary" size="small" @click="submit">立即发布</el-button>
            <Upload :action="uploadUrl" :headers="uploadHeaders" name="inputFile" width="32" :ShowFileList="true" :border="false" :fileList="upload.fileList" class="m-article-add-uploader" @success="uploadSuccess">
                <el-button size="small" icon="el-icon-upload" type="primary">上传封面</el-button>
            </Upload>
        </div>
        <el-row :gutter="20" class="m-article-add-margin">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="addForm.title">
                    <template #prepend>标题</template>
                </el-input>
            </el-col>
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="addForm.author">
                    <template #prepend>作者</template>
                </el-input>
            </el-col>
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="addForm.desc">
                    <template #prepend>描述</template>
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" align="center" class="m-article-add-margin">
            <el-col :xs="10" :sm="10" :md="6" :lg="5">
                <el-tag type="warning" effect="dark" class="m-article-add-tag">来源</el-tag>
                <Select :option="['原创','转载']" :selectValue="addForm.origin" @change="selectChange" size="small"></Select>
            </el-col>
            <el-col :span="14">
                <el-tag type="warning"  effect="dark">标签</el-tag>
                <Tag :Tags="addForm.type" @close="tagClose" @add="tagAdd"/>
            </el-col>
        </el-row>
        <Editor v-model="addForm.content" ref="editorRef" :height="editorHeight" v-if="!isEdit || addForm.content"/>
    </div>
</template>

<script setup lang="ts">

    import {ref,reactive,computed,onMounted, unref} from 'vue'
    import {useRoute,useRouter,onBeforeRouteUpdate} from 'vue-router'
    import {addArticleApi,getArticleDetailApi} from '@/api/article'
    import type {ArticleParams} from '@/api/model/articleModel'
    import {baseUrl,uploadUrl,uploadHeaders} from '@/hooks/useUpload'
    import type {responseType} from '@/components/element/upload/types'
    import {success,error,warning} from '@/components/element/notice/message'
    import Editor from '@/components/markdown/index.vue'
    import Upload from '@/components/element/upload/index.vue'
    import Select from '@/components/element/select/index.vue'
    import Tag from '@/components/element/tag/index.vue'

    type fileListType = {
        name:string,
        url:string
    }
    const route = useRoute()
    const router = useRouter()
    const addForm = reactive({
        title:'',
        content:'',
        desc:'',
        origin:'原创',
        type:[''],
        author:'',
        img_url:''
    })
    const upload:Record<string,fileListType[]> = reactive({
        fileList:[]
    })
    const editorRef:any = ref(null)

    const editorHeight = computed(()=>'calc(100% - 145px)')
    const isEdit = computed(()=>route.params.id?true:false)

    const getLearnDetailByEdit = (id:string)=>{
        getArticleDetailApi(id).then(res=>{
            //console.log(res)
            addForm.title = res.detail.title
            addForm.content = res.detail.content
            addForm.desc = res.detail.desc
            addForm.origin = res.detail.origin
            addForm.type = res.detail.type.split(',')
            addForm.author = res.detail.author
            addForm.img_url = res.detail.img_url
            upload.fileList.push({name:'封面',url:baseUrl+res.detail.img_url})
        })
    }
    if(isEdit.value){
        getLearnDetailByEdit(route.params.id as string)
    }
    //keywrod
    // const keyWord = computed(()=>addForm.keyWord.split(','))

    const tagClose = (tag:string)=>{
        addForm.type.splice(addForm.type.indexOf(tag),1)
    }

    const tagAdd = (value:string)=>{
        addForm.type.push(value)
    }
    //origin
    const selectChange = (value:string)=>{
        addForm.origin = value
    }

    const uploadSuccess = (res:responseType)=>{
        if(res.status!=200) return error('封面上传失败!')
        upload.fileList.push({name:'封面',url:baseUrl+res.url})
        addForm.img_url = res.url
    }
    
    //草稿箱
    const addToDraft = ()=>{
        const {title,content} = addForm
        if(title && content){
            addArticleApi(getSubmitData(1)).then(res=>{
                if(res.err_code !=200) return error('加入草稿箱失败！')
                success('已成功加入草稿箱！')
                resetFormData()
                if(isEdit.value){
                    backToManage()
                }
            })
        }else{
            error('请输入标题以及内容')
        }
    }
    
    //立即提交
    const submit = ()=>{
        const {title,content,desc,type,origin,author} = addForm
        console.log(addForm)
        if(title && content && desc && origin && type.length>1 && author){
            addArticleApi(getSubmitData(0)).then(res=>{
                if(res.err_code !=200) return error('提交失败！')
                success('提交成功！')
                resetFormData()
                if(isEdit.value){
                    backToManage()
                }
            })
        }else{
            error('请输入必填内容')
        }
    }

    // edit back
    const backToManage = ()=>{
        router.back()
    }
    const getSubmitData = (status:number)=>{
        const {title,content,desc,origin,type,author,img_url} = addForm
        let submitData:ArticleParams = {title,content,desc,origin,type:type.filter(item=>item.length > 0).join(','),number:content.length,author,status}
        if(img_url.length>0){
            submitData.img_url = img_url
        }
        if(isEdit.value){
            submitData.id = route.params.id as string
        }
        
        return submitData
    }
    
    const resetFormData = ()=>{
        addForm.title = ''
        addForm.content = ''
        addForm.desc = ''
        addForm.origin = ''
        addForm.type = ['']
        addForm.author = ''
        addForm.img_url = ''
        upload.fileList = []
    }
    onMounted(()=>{
        console.log(editorRef.value)
    })
    onBeforeRouteUpdate((to)=>{
        //console.log(to)
    })
</script>

<style lang="less" scoped>
.m-article-add{
    height:100%;
    &-submit{
        display: flex;
        align-items: center;
    }
    &-margin{
        margin:10px 0px;
    }
    &-uploader{
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    &-tag{
        margin-right:10px;
    }
}

</style>