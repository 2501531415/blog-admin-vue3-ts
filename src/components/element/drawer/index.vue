<template>
    <el-drawer :title="title" v-model="drawerVisiable" :direction="direction" :size="size" @closed="drawerClosed" :destroy-on-close="DestroyOnClose">
        <slot></slot>
    </el-drawer>
</template>


<script setup lang="ts">
    import {defineProps,defineEmit} from 'vue'
    import type {PropType} from 'vue'

    const props = defineProps({
        title:{
            type:String as PropType<string>,
            default:'标题'
        },
        drawerVisiable:{
            type:Boolean as PropType<boolean>,
            default:false
        },
        direction:{
            type:String,
            default:'rtl'
        },
        size:{
            type:String as PropType<string>,
            default:'50%'
        },
        DestroyOnClose:{
            type:Boolean as PropType<boolean>,
            default:false
        }
    })

    const emit = defineEmit({'close':null})

    const drawerClosed = ()=>{
        emit('close')
    }

</script>

<style>
    .el-drawer__body{
        overflow:auto;
    }
</style>