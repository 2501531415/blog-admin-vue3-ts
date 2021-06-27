<template>
    <div class="m-aside">
        <logo :isCollapse="isCollapse"/>
        <m-menu :menu="allowRoutes" :router="true" :collapse="isCollapse" background-color="#393D49" text-color="#fff" :default-active="defaultActive"/>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import {useRoute} from 'vue-router'
    import {permissionStore} from '@/store/modules/permission'
    import {settingStore} from '@/store/modules/setting'
    import MMenu from '@/components/element/menu/index.vue'
    import logo from './logo.vue'
    
    const permission = permissionStore()
    const setting = settingStore()

    const route = useRoute()
    //菜单menu
    const allowRoutes  = computed(()=>permission.sortAllowRoutes)
    //菜单是否折叠
    const isCollapse = computed(()=>setting.isCollapse)

    const defaultActive = computed(()=>{
        if(route.meta.isHide){
            return route.matched[0].path
        }else{
            return route.path
        }
    })
    
    
</script>

<style scoped lang="less">
    .el-menu{
        border-right: none;
    }
</style>
