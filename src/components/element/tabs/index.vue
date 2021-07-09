<template>
  <el-tabs v-model="ActiveTab" type="card" @tab-remove="removeTab" @tab-click="tabClick">
    <el-tab-pane
      v-for="(item, index) in tabs"
      :key="item.name"
      :label="item.name"
      :name="item.path"
      :closable="!item.closable"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
    import {defineProps,defineEmit,watch} from 'vue'
    import type {PropType} from 'vue'
    import type { TabsMenu } from '@router/types'

    const props = defineProps({
      ActiveTab:{
        type:String || Number as PropType<string | number>,
        default:''
      },
      tabs:{
        type:Array as PropType<TabsMenu[]>,
        default:[]
      }
    })

    watch(()=>props.tabs,(value)=>{
      console.log(value)
    })
    const emit = defineEmit(['removeTab','tabClick'])
    
    const removeTab = (path:string)=>{
      emit('removeTab',path)
    }
    const tabClick = (e:any)=>{
      emit('tabClick',e.props)
    }
</script>

<style scoped lang="less">
    :deep(.el-tabs__header){
      margin:0;
      border-bottom: none;
      .el-tabs__item{
        border-bottom: 1px solid #eee;
      }
    }
    :deep(.el-tabs__item.is-active){
      border-bottom-color:#eee!important;
    }
</style>