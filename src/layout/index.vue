<template>
    <el-container>
        <el-aside :width="isCollapse?'65px':'300px'" class="m-transition">
            <Asdie></Asdie>
        </el-aside>
        <el-container :class="[isCollapse?'m-layout-margin-collapse':'m-layout-margin','m-transition']">
            <el-header :class="[isCollapse?'m-header-width-collapse':'m-header-width']">
                <m-header></m-header>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>footer</el-footer>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
    import {computed} from 'vue'
    import {settingStore} from '@/store/modules/setting'
    import Asdie from './aside/index.vue'
    import MHeader from './header/index.vue'
    const setting = settingStore()

    //菜单是否折叠
    const isCollapse = computed(()=>setting.isCollapse)
    
</script>

<style scoped lang="less">
    @color:red;
    .el-container,.el-aside{
        height:100%
    }
    .el-header{
        position: fixed;
        height:auto!important;
    }
    .el-aside{
        position: fixed;
        background-color: #545c64;
    }
    .el-main{
        overflow: initial;
        padding-top: 110px;
    }
    .m-layout-margin{
        margin-left:300px;
    }
    .m-layout-margin-collapse{
        margin-left:64px;
    }
    .m-header-width{
        width:calc(100vw - 300px);
    }
    .m-header-width-collapse{
        width:calc(100vw - 64px);
    }
    .m-transition{
        transition: all 0.8s ease-in-out;
    }

</style>