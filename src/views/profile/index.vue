<template>
    <el-card>
        <el-tabs :tab-position="tabPosition">
            <el-tab-pane label="简介设置">
                <introbute :info="profile.introduce" @save="introduceSave"/>
            </el-tab-pane>
            <el-tab-pane label="项目设置">项目设置</el-tab-pane>
            <el-tab-pane label="开源贡献设置">开源贡献设置</el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script setup lang="ts">
    import {ref,reactive} from 'vue'
    import {getIntroduceApi,editIntroduceApi} from '@/api/profile'
    import introbute from './components/introduce.vue'
    import type {IntroduceParams} from '@/api/model/profileModel'
    import {success,error} from '@/components/element/notice/message'
    const tabPosition = ref('left')

    const profile = reactive({
        introduce:{
            name:'',
            nickName:'',
            avatar:'',
            gender:'',
            age:'',
            introduce:'',
            tags:''
        }
    })

    getIntroduceApi().then(res=>{
        profile.introduce = res.data[0]
    })

    const introduceSave = (info:IntroduceParams)=>{
        info.id=info._id
        editIntroduceApi(info).then(res=>{
            if(res.err_code !=200) return error('保存失败！')
            success('保存成功')
        })
    }

</script>