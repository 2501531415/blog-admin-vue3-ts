<template>
    <el-row type="flex" justify="end" align="middle" class="m-login" >
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <loginForm/>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import loginForm from './loginForm.vue'

</script>

<style lang="less">
  @name:~'@{namespace}-login';
  .@{name}{
    height: 100%;
  }

  
</style>