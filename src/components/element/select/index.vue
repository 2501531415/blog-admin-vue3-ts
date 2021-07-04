<template>
    <el-select v-model="selectValue" placeholder="请选择" :size="size" @change="selectChange">
      <el-option
        v-for="item in option"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
</template>

<script setup lang="ts">

import {defineProps,defineEmit,watch} from 'vue'
import type {PropType} from 'vue'

const props = defineProps({
    option:{
        type:Array as PropType<string[]>,
        default:[]
    },
    selectValue:{
        type:String as PropType<string>,
        default:''
    },
    size:{
        type:String as PropType<'mini'|'small'|'medium'>
    }
})

const emit = defineEmit({'change':(value:string)=>{
    if(value){
        return true
    }
}})

const selectChange = ()=>{
    emit('change',props.selectValue)
}


</script>