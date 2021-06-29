<template>
   <el-dialog :title="title" v-model="DialogVisible" :width="width" :destroy-on-close="DestroyOnClose" :center="center" @closed="closed">
        <slot></slot>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogCancleClick">取 消</el-button>
                <el-button type="primary" @click="dialogSureClick">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import {defineProps,defineEmit} from 'vue'
    import type {PropType} from 'vue'
    const props = defineProps({
        DialogVisible:{
            type:Boolean as PropType<boolean>,
            default:false
        },
        title:{
            type:String as PropType<string>,
            default:'提示'
        },
        width:{
            type:String || Number as PropType<string | number>,
            default:'50%'
        },
        //
        center:{
            type:Boolean as PropType<boolean>,
            default:false
        },
        DestroyOnClose:{
            type:Boolean as PropType<boolean>,
            default:false
        }
    })

    const emit = defineEmit(['cancle','sure','closed'])

    const dialogCancleClick = ()=>{
        emit('cancle')
    }

    const dialogSureClick = ()=>{
        emit('sure')
    }

    const closed = ()=>{
        emit('closed')
    }

</script>