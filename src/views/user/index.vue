<template>
    <div v-for="item in 100" :key="item">
        user
    </div>
</template>

<script setup lang="ts">
    import {userList} from '@/api/user'
    // userList().then(res=>{
    //     console.log(res)
    // })

</script>