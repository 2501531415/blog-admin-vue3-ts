<template>
    <el-menu :default-active="DefaultActive" :mode="mode" :background-color="BackgroundColor" :text-color="TextColor" :active-text-color="ActiveTextColor" :router="router" :collapse="collapse" :collapse-transition="CollapseTransition">
        <template v-for="(item,index) in menu" :key="index">
            <el-submenu :index="item.path" v-if="item.children">
                <template #title>
                    <i :class="`el-icon-${item.meta.icon}`"></i>
                    <span>{{item.meta.title}}</span>
                </template>
                <el-menu-item v-for="(child,indey) in item.children" :key="indey" :route="child.path" :index="child.path">
                    <i :class="`el-icon-${child.meta.icon}`"></i>
                    <template #title>{{child.meta.title}}</template>
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.path">
                <i :class="`el-icon-${item.meta.icon}`"></i>
                <template #title>{{item.meta.title}}</template>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script setup lang="ts">
    import {defineProps} from 'vue'
    import type {PropType} from 'vue'
    import type { MenuRouteRecordRaw } from '@router/types'
    const props = defineProps({
        menu:{
            type:Array as PropType<MenuRouteRecordRaw[]>,
            default:[],
            requried:true
        },
        DefaultActive:{
            type:String || Number,
        },
        mode:{
            type:String,
            default:'vertical'
        },
        BackgroundColor:{
            type:String,
            default:'#ffffff'
        },
        TextColor:{
            type:String,
            default:'#303133'
        },
        ActiveTextColor:{
            type:String,
            default:'#409EFF'
        },
        router:{
            type:Boolean,
            default:false
        },
        collapse:{
            type:Boolean as PropType<Boolean>,
            default:false
        },
        CollapseTransition:{
            type:Boolean,
            default:false
        }
    })
</script>