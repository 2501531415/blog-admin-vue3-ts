<template>
    <el-row :gutter="50">
        <el-col :span="12">
            <el-form ref="introduceRef" :model="info" label-width="80px" label-position="right" :rules="rules">
                <el-form-item label="名字" prop="name">
                    <el-input type="text" v-model="info.name"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickName">
                    <el-input type="text" v-model="info.nickName"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <Select :option="['男','女']" :selectValue="info.gender" @change="genderSelectChange"></Select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker
                        v-model="info.birthday"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <!-- <Select :option="['男','女']" :selectValue="info.gender" @change="genderSelectChange"></Select> -->
                    <el-input type="text" v-model="info.address"></el-input>
                </el-form-item>
                <el-form-item label="公司" prop="company">
                    <!-- <Select :option="['男','女']" :selectValue="info.gender" @change="genderSelectChange"></Select> -->
                    <el-input type="text" v-model="info.company"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="introduce">
                    <el-input type="textarea" v-model="info.introduce"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <Tags :Tags="tags" @add="tagAdd" @close="tagClose"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save">保存设置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12">
            <Upload :action="uploadUrl" :headers="uploadHeaders" name="inputFile" width="150" :border="false" @success="uploadSuccess">
                <template v-if="info.avatar">
                    <img :src="baseUrl + info.avatar" alt="" class="m-user-avatar">
                    <el-button size="small" icon="el-icon-upload" type="primary">更新头像</el-button>
                </template>
            </Upload>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import {ref,defineProps,computed,defineEmit,unref} from 'vue'
    import type {PropType} from 'vue'
    import {baseUrl,uploadUrl,uploadHeaders} from '@/hooks/useUpload'
    import type {IntroduceParams} from '@/api/model/profileModel'
    import type {responseType} from '@/components/element/upload/types'
    import Upload from '@/components/element/upload/index.vue'
    import Tags from '@/components/element/tag/index.vue'
    import Select from '@/components/element/select/index.vue'
    import {error} from '@/components/element/notice/message'

    const props = defineProps({
        info:{
            type:Object as PropType<IntroduceParams>,
            default:()=>{
                return {
                    name:'',
                    introduce:'',
                    avatar:'',
                    tags:''
                }
            }
        }
    })

    const emits = defineEmit({'save':(introduce:IntroduceParams)=>{
        if(introduce){
            return true
        }
    }})
    
    const introduceRef:any = ref(null)

    const tags = computed(()=>props.info.tags.split(','))

    const rules = {
            name:[
                {required:true,message:'请输入名字',trigger:'blur'},
                {min:2,message:'账号长度不少于2个字符',trigger:'blur'}
            ],
            nickName:[
                {required:true,message:'请输入昵称',trigger:'blur'},
                {min:2,message:'账号长度不少于2个字符',trigger:'blur'}
            ],
            gender:[
                {required:true,message:'请选择性别',trigger:'change'},
            ],
            birthday:[
                {required:true,message:'请选择生日日期',trigger:'blur'},
            ],
            address:[
                {required:true,message:'请选择地址',trigger:'blur'},
            ],
            company:[
                {required:true,message:'请选择公司名称',trigger:'blur'},
            ],
            introduce:[
                {required:true,message:'请输入简介',trigger:'blur'},
            ],
            tags:[
                {required:true,message:'请选择标签',trigger:'blur'},
            ]
        }
    const uploadSuccess = (res:responseType)=>{
        console.log(res)
        if(res.status!=200) return error('头像上传失败!')
        props.info.avatar= res.url
    }

    const genderSelectChange = (value:string)=>{
        props.info.gender = value
    }

    //tag add
    const tagAdd = (tag:string)=>{
        const tags = props.info.tags.split(',')
        tags.push(tag)
        props.info.tags = tags.join(',')
    }

    const tagClose = (tag:string)=>{
        const tags = props.info.tags.split(',')
        tags.splice(tags.indexOf(tag),1)
        props.info.tags = tags.join(',')
    }
    const save = ()=>{
        // emits('save',props.info)
        unref(introduceRef).validate((valid:boolean)=>{
            if(valid){
                emits('save',props.info)
            }
        })
    }
</script>