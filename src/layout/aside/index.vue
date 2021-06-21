<template>
    <div class="m-aside">
        <m-menu :menu="allowRoutes" :router="true" :collapse="isCollapse" background-color="#545c64" text-color="#fff"/>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import {permissionStore} from '@/store/modules/permission'
    import {appStore} from '@/store/modules/app'
    import MMenu from '@/components/element/menu/index.vue'
    
    const permission = permissionStore()
    const app = appStore()
    //菜单menu
    const allowRoutes  = computed(()=>permission.allowRoutes)
    //菜单是否折叠
    const isCollapse = computed(()=>app.isCollapse)
    
</script>

<style scoped lang="less">
    .el-menu{
        border-right: none;
    }
</style>
