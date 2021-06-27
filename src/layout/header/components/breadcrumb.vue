<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in list" :key="item">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
    import {defineProps} from 'vue'
    import type {PropType} from 'vue'
    
    const props = defineProps({
        list:{
            type:Array as PropType<string[]>,
            default:[]
        }
    })

</script>