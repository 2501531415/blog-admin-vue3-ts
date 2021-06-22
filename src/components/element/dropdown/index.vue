<template>
    <el-dropdown split-button type="primary" :size="size" @click="handleClick" @command="menuClick">
        {{ButtonTitle}}
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :command="item.command" :icon="item.icon" v-for="item in DropDownItem" :key="item">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
    import {defineProps,defineEmit} from 'vue'
    import type {PropType} from 'vue'

    type ItemType = {
        name:string,
        icon:string,
        command:string | number
    }
    type SizeType = PropType<'medium' | 'small' | 'mini'>
    const props = defineProps({
        ButtonTitle:{
            type:String as PropType<string>,
            default:'更多菜单'
        },
        DropDownItem:{
            type:Array as PropType<ItemType[]>,
            default:[]
        },
        size:{
            type:String as SizeType,
            default:''
        }
        
    })

    const emit = defineEmit({'menuClick':(command:string)=>{
        if(!command){
            return false
        }else{
            return true
        }
    }})

    //按钮点击
    const handleClick = ():void=>{
       console.log(44)
    }

    //下拉菜单item点击
    const menuClick = (command:string):void=>{
        emit('menuClick',command)
    }
</script>