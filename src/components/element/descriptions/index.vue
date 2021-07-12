<template>
    <el-descriptions :title="title" :column="cloumn" :size="size" :border="border">
    <el-descriptions-item v-for="(item,index) in descData" :key="index">
      <template #label>
        {{item.label}}
      </template>
      {{item.value}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">    
    import {defineProps} from 'vue'
    import type {PropType} from 'vue'
    import type {DescType} from './types'
    const props = defineProps({
        descData:{
            type:Array as PropType<DescType[]>,
            default:[]
        },
        title:{
            type:String as PropType<string>,
            default:'标题'
        },
        cloumn:{
            type:Number as PropType<number>,
            default:3
        },
        size:{
            type:String as PropType<'medium' | 'small' | 'mini'>,
            default:'small'
        },
        border:{
            type:Boolean as PropType<boolean>,
            default:true
        }
    })

</script>