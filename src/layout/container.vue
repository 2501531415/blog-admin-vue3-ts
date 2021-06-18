<template>
    <div>
        <!-- <el-button type="warning">55555</el-button> -->
        {{user.test}}
    </div>
</template>

<script setup lang="ts">
    import {userStore} from '@/store/modules/user'

    const user = userStore()


</script>