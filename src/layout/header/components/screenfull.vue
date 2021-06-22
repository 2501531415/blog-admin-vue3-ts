<template>
    <div class="m-screenfull">
        <i :class="[isFullscreen?'el-icon-switch-button':'el-icon-full-screen']" @click="screenfullClick"></i>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue'
    import screenfull from 'screenfull'

    const isFullscreen = ref(false)
    
    const screenfullClick = ()=>{
        if(screenfull.isEnabled){
            screenfull.toggle()
        }
    }
    onMounted(()=>{
        if(screenfull.isEnabled){
            screenfull.onchange((e)=>{
                if(screenfull.isEnabled){
                    isFullscreen.value = screenfull.isFullscreen
                }
            })
        }
    })
    onUnmounted(()=>{
        if(screenfull.isEnabled){
            screenfull.off('change',()=>{
                return false
            })
        }
    })
</script>

<style scoped lang="less">
    .m-screenfull{
        i{
            font-size: 24px;
        }
    }
</style>

