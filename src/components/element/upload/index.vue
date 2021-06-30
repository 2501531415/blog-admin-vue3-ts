<template>
     <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="ShowFileList"
        :auto-upload="AutoUpload"
        :headers="headers"
        :multiple="multiple"
        :data="data"
        :name="name"
        :drag="drag"
        :accept="accept"
        :on-remove="handleAvatarRemove"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :style="{'width':size,'height':size,'line-height':size}"
        >
        <slot></slot>
        <i  class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script setup lang="ts">
import {defineProps,defineEmit,computed} from 'vue'
import type {PropType} from 'vue'

type HeaderType = {
    token:string
}
type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';
type UploadFile = {
    name: string;
    percentage?: number;
    status: UploadStatus;
    size: number;
    response?: unknown;
    uid: number;
    url?: string;
    raw: ElFile;
};
interface ElFile extends File {
    uid: number;
}
const props = defineProps({
    action:{
        type:String as PropType<string>,
        required:true
    },
    AutoUpload:{
        type:Boolean as PropType<boolean>,
        default:true
    },
    ShowFileList:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    headers:{
        type:Object as PropType<HeaderType>,
        required:true
    },
    multiple:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    //额外参数
    data:{
        type:Object
    },
    name:{
        type:String as PropType<string>
    },
    drag:{
        type:Boolean as PropType<boolean>,
        default:false
    },
    accept:{
        type:String as PropType<'audio/*' | 'video/*' | 'image/*'>
    },
    width:{
        type:String || Number as PropType<string | number>,
        default:'100'
    }
    
}) 

const emit = defineEmit(['remove','success','beforeUpload'])

const size = computed(()=>props.width + 'px')

const handleAvatarRemove = ()=>{
    
}

const handleAvatarSuccess = (file:UploadFile,fileList:UploadFile[])=>{
    console.log(file)
}

const beforeAvatarUpload = ()=>{

}

</script>

<style lang="less">
.avatar-uploader{
    font-size: 28px;
    color: #8c939d;
    text-align: center;
    border: 1px dashed #eee;
}
</style>