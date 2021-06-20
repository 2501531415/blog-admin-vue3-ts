<template>
    <el-container>
        <el-aside>
            <a-side></a-side>
        </el-aside>
        <el-container class="m-layout-margin">
            <el-header>header</el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>footer</el-footer>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
    import ASide from './aside/index.vue'
</script>

<style scoped lang="less">
    @color:red;
    .el-container,.el-aside{
        height:100%
    }
    .el-aside{
        position: fixed;
        color:@color;
    }
    .el-main{
        overflow: initial;
    }
    .m-layout-margin{
        margin-left:300px;
    } 



</style>