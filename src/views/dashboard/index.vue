<template>
    <div class="m-dashboard">
        <total :total="totalState"/>
        <analysis/>
    </div>
</template>


<script setup lang="ts">
    import {reactive} from 'vue'
    import total from './components/total.vue'
    import analysis from './components/analysis.vue'
    import {getDashboardTotalApi} from '@/api/dashboard'
    const totalState = reactive({
        views:0,
        comments:0,
        likes:0,
        article:0,
        learn:0,
        message:0,
        draft:0,
        post:0,
    })
    getDashboardTotalApi().then(res=>{
        console.log(res)
        res.data.article_meta_total.forEach(item=>{
            totalState.views += item.views_total
        })
        res.data.learn_meta_total.forEach(item=>{
            totalState.views += item.views_total
        })
        totalState.message = res.data.message_total
    })

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