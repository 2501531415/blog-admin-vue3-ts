<template>
    <div class="m-learn-add">
        <div class="m-learn-add-submit">
            <el-button type="primary" size="small">草稿箱</el-button>
            <el-button type="primary" size="small">立即发布</el-button>
        </div>
        <el-row :gutter="20" class="m-learn-add-margin">
            <el-col :span="12">
                <el-input placeholder="请输入内容" v-model="addForm.title">
                    <template #prepend>标题</template>
                </el-input>
            </el-col>
            <el-col :span="12">
                <el-input placeholder="请输入内容" v-model="addForm.content">
                    <template #prepend>作者</template>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-input placeholder="请输入内容" v-model="addForm.desc">
                    <template #prepend>描述</template>
                </el-input>
            </el-col>
        </el-row>
        <!-- <Upload action="111">
            <template>
                <el-button>上传封面</el-button>
            </template>
        </Upload> -->
        <el-row type="flex" align="center" class="m-learn-add-margin">
            <el-col :xs="10" :sm="10" :md="6" :lg="5">
                <el-tag type="warning" effect="dark">类型</el-tag>
                <Select :option="['555','8888']" :selectValue="addForm.type" @change="selectChange" size="small"></Select>
            </el-col>
            <el-col :span="14">
                <el-tag type="warning"  effect="dark">标签</el-tag>
                <Tag :Tags="['6666']"/>
            </el-col>
        </el-row>
        <Editor  height="600"/>
    </div>
</template>

<script setup lang="ts">

    import {ref,reactive} from 'vue'
    import Editor from '@/components/editor/editor.vue'
    import Upload from '@/components/element/upload/index.vue'
    import Select from '@/components/element/select/index.vue'
    import Tag from '@/components/element/tag/index.vue'
    const addForm = reactive({
        title:'',
        content:'',
        desc:'',
        type:'554454'
    })

    const selectChange = (value:string)=>{
        addForm.type = value
    }
</script>

<style lang="less" scoped>
.m-learn-add{
    &-margin{
        margin:10px 0px;
    }
}

</style>