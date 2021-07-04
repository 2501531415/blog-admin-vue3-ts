<template>
     <el-upload
        :class="[{'uploader-border':border},'avatar-uploader']"
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
        :before-upload="beforeUpload"
        :style="{'width':size,'height':size,'line-height':size}"
        :file-list="fileList"
        >
        <slot>
            <i  class="el-icon-plus avatar-uploader-icon"></i>
        </slot>
    </el-upload>
</template>

<script setup lang="ts">
import {defineProps,defineEmit,computed} from 'vue'
import type {PropType} from 'vue'
import type {HeaderType,UploadFile,responseType} from './types'



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
    },
    border:{
        type:Boolean as PropType<boolean>,
        default:true   
    },
    fileList:{
        type:Array,
        default:[]
    }
    
}) 

const emit = defineEmit({'success':(res:responseType)=>{
    if(res){
        return true
    }else{
        return false
    }
}})

// const successEmit = defineEmit()

const size = computed(()=>props.width + 'px')

const handleAvatarRemove = (file:UploadFile, fileList:UploadFile[])=>{
    // emit('remove',file,fileList)
}

const handleAvatarSuccess = (response:responseType,file:UploadFile,fileList:UploadFile[])=>{
    emit('success',response)
}

const beforeUpload = (file:UploadFile)=>{
    // emit('beforeUpload',file)
}

</script>

<style lang="less">
.avatar-uploader{
    // font-size: 28px;
    color: #8c939d;
    text-align: center;
}

.uploader-border{
    border: 1px dashed #eee;
}
</style>