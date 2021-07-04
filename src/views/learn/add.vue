<template>
    <div class="m-learn-add">
        <div class="m-learn-add-submit">
            <el-button type="primary" size="small" @click="addToDraft">草稿箱</el-button>
            <el-button type="primary" size="small" @click="submit">立即发布</el-button>
            <Upload :action="uploadUrl" :headers="uploadHeaders" name="inputFile" width="32" :ShowFileList="true" :border="false" :fileList="upload.fileList" class="m-learn-add-uploader" @success="uploadSuccess">
                <el-button size="small" icon="el-icon-upload" type="primary">上传封面</el-button>
            </Upload>
        </div>
        <el-row :gutter="20" class="m-learn-add-margin">
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
        <el-row type="flex" align="center" class="m-learn-add-margin">
            <el-col :xs="10" :sm="10" :md="6" :lg="5">
                <el-tag type="warning" effect="dark" class="m-learn-add-tag">类型</el-tag>
                <Select :option="['555','8888']" :selectValue="addForm.type" @change="selectChange" size="small"></Select>
            </el-col>
            <el-col :span="14">
                <el-tag type="warning"  effect="dark">标签</el-tag>
                <Tag :Tags="addForm.keyWord" @close="tagClose" @add="tagAdd"/>
            </el-col>
        </el-row>
        <Editor v-model="addForm.content" height="600"/>
    </div>
</template>

<script setup lang="ts">

    import {ref,reactive,computed} from 'vue'
    import {addLearnApi} from '@/api/learn'
    import {baseUrl,uploadUrl,uploadHeaders} from '@/hooks/useUpload'
    import type {responseType} from '@/components/element/upload/types'
    import {success,error,warning} from '@/components/element/notice/message'
    import Editor from '@/components/editor/editor.vue'
    import Upload from '@/components/element/upload/index.vue'
    import Select from '@/components/element/select/index.vue'
    import Tag from '@/components/element/tag/index.vue'
    
    type fileListType = {
        name:string,
        url:string
    }
    const addForm = reactive({
        title:'',
        content:'',
        desc:'',
        type:'',
        keyWord:[''],
        number:'',
        author:'',
        img_url:'',
        // 0发布 1草稿箱
        status:0,
    })
    const upload:Record<string,fileListType[]> = reactive({
        fileList:[]
    })

    //keywrod
    // const keyWord = computed(()=>addForm.keyWord.split(','))

    const tagClose = (tag:string)=>{
        addForm.keyWord.splice(addForm.keyWord.indexOf(tag),1)
    }

    const tagAdd = (value:string)=>{
        addForm.keyWord.push(value)
    }
    //type
    const selectChange = (value:string)=>{
        addForm.type = value
    }

    const uploadSuccess = (res:responseType)=>{
        if(res.status!=200) return error('封面上传失败!')
        upload.fileList.push({name:'封面',url:baseUrl+res.url})
        addForm.img_url = res.url
    }
    
    //草稿箱
    const addToDraft = ()=>{
       
    }
    
    //立即提交
    const submit = ()=>{
        const data = {
        title:addForm.title,
        content:addForm.content,
        desc:addForm.desc,
        type:addForm.type,
        keyWord:addForm.keyWord.filter(item=>item.length > 0).join(','),
        number:addForm.content.length,
        author:addForm.author,
        img_url:addForm.img_url,
        // 0发布 1草稿箱
        status:0,
    }
    console.log(data)
        addLearnApi(data).then(res=>{
            console.log(res)
        })
    }
</script>

<style lang="less" scoped>
.m-learn-add{
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