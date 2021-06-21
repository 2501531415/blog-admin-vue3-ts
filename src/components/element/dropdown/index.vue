<template>
    <el-dropdown split-button type="primary" @click="handleClick">
        {{ButtonTitle}}
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :command="item.command" :icon="item.icon" v-for="item in DropDownItem" :key="item">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
    import {defineProps} from 'vue'
    import type {PropType} from 'vue'

    type ItemType = {
        name:string,
        icon:string,
        command:string | number
    }
    const props = defineProps({
        ButtonTitle:{
            type:String as PropType<string>,
            default:'更多菜单'
        },
        DropDownItem:{
            type:Array as PropType<ItemType[]>,
            default:[]
        }
    })

    const handleClick = ()=>{
        console.log('555')
    }
    console.log(props)
</script>