<template>
    <el-row :gutter="50">
        <el-col :span="8">
            <el-form :model="info" label-width="80px" label-position="right">
                <el-form-item label="名字">
                    <el-input type="text" v-model="info.name"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input type="text" v-model="info.nickName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <Select :option="['男','女']" :selectValue="info.gender" @change="genderSelectChange"></Select>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker
                        v-model="info.birthday"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <!-- <Select :option="['男','女']" :selectValue="info.gender" @change="genderSelectChange"></Select> -->
                    <el-input type="text" v-model="info.nickName"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" v-model="info.introduce"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <Tags :Tags="tags"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">保存设置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12">
            <Upload :action="uploadUrl" :headers="uploadHeaders" name="inputFile" width="150" @success="uploadSuccess">
                <template v-if="info.avatar">
                    <img :src="baseUrl + info.avatar" alt="" class="m-user-avatar">
                    <el-button size="small" icon="el-icon-upload" type="primary">更新头像</el-button>
                </template>
            </Upload>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import {defineProps,computed} from 'vue'
    import type {PropType} from 'vue'
    import {baseUrl,uploadUrl,uploadHeaders} from '@/hooks/useUpload'
    import type {IntroduceParams} from '@/api/model/profileModel'
    import Upload from '@/components/element/upload/index.vue'
    import Tags from '@/components/element/tag/index.vue'
    import Select from '@/components/element/select/index.vue'

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

    const tags = computed(()=>props.info.tags.split(','))
    const uploadSuccess = ()=>{
        
    }

    const genderSelectChange = ()=>{

    }
</script>