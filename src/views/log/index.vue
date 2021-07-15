<template>
    <div>
        <Test/>
        <el-button type="primary" @click="testClick">点击</el-button>
    </div>
</template>


<script setup lang="ts">

import {provide,ref} from 'vue'
import Test from './components/Test.vue'

const message = ref(7777)

const testClick = ()=>{
    message.value = 666
}
provide('test',message)

</script>