<template>
    <div class="m-dashboard">
        <total/>
        <analysis/>
    </div>
</template>


<script setup lang="ts">
    import total from './components/total.vue'
    import analysis from './components/analysis.vue'

</script>


<style lang="less">
.m-dashboard{
    background-color: #eee;
    height:100%;
    padding:10px;
}
.test{
    width:500px;
    height:500px;
}

</style>`