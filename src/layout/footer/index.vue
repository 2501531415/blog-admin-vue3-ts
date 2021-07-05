<template>
    <div class="m-footer">
        <span>wmyy© 2019-{{now}} · 粤ICP备20007315号-1 wmyy.fun,All Rights Reserved</span>
    </div>
</template>

<script setup lang="ts">
    import {computed} from 'vue'
    const now = computed(()=>new Date().getFullYear())
</script>

<style lang="less">
.m-footer{
    text-align: center;
    line-height: 60px;
}

</style>