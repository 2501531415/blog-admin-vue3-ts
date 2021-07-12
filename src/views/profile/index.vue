<template>
    <el-card>
        <el-tabs :tab-position="tabPosition">
            <el-tab-pane label="简介设置">
                <introbute/>
            </el-tab-pane>
            <el-tab-pane label="项目设置">项目设置</el-tab-pane>
            <el-tab-pane label="开源贡献设置">开源贡献设置</el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script setup lang="ts">
    import {ref} from 'vue'
    import introbute from './components/introduce.vue'

    const tabPosition = ref('left')

</script>