<template>
    <div class="m-aside">
        <logo :isCollapse="isCollapse"/>
        <m-menu :menu="allowRoutes" :router="true" :collapse="isCollapse" background-color="#393D49" text-color="#fff"/>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import {permissionStore} from '@/store/modules/permission'
    import {settingStore} from '@/store/modules/setting'
    import MMenu from '@/components/element/menu/index.vue'
    import logo from './logo.vue'
    
    const permission = permissionStore()
    const setting = settingStore()
    //菜单menu
    const allowRoutes  = computed(()=>permission.allowRoutes)
    //菜单是否折叠
    const isCollapse = computed(()=>setting.isCollapse)
    
</script>

<style scoped lang="less">
    .el-menu{
        border-right: none;
    }
</style>
