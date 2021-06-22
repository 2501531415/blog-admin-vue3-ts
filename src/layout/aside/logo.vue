<template>
    <div class="m-logo">
        <img src="@/assets/logo.png" alt="">
        <div class="m-logo-title" v-if="!isCollapse">this is my blog</div>
    </div>
</template>

<script setup lang="ts">
    import {defineProps} from 'vue'
    import type {PropType} from 'vue'

    const props = defineProps({
        isCollapse:{
            type:Boolean as PropType<Boolean>
        }
    })
</script>

<style scoped lang="less">
    .m-logo{
        height:60px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        img{
            width:45px;
            height:45px;
        }
        &-title{
            font-size: 24px;
            color:#fff;
            white-space: nowrap;
        }
    }
</style>