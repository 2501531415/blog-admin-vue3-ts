<template>
    <div>
        {{test}}
    </div>
</template>


<script setup lang="ts">

import {inject,watch} from 'vue'

const test = inject('test')

watch(()=>test,(value)=>{
    console.log(value)
})
</script>