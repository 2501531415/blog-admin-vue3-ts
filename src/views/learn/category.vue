<template>
    <div>
        <CardList :card-list="learn.categoryList"/>
    </div>
</template>

<script setup lang="ts">
    import {ref,reactive,computed} from 'vue'

    import {getLearnCategoryApi} from '@/api/learn'
    import type {LearnCategoryParams} from '@/api/model/learnModel'
    import CardList from './components/cardList.vue'

    const learn:Record<string,LearnCategoryParams[]> = reactive({
        categoryList:[]
    })


    const getLearnCategory = ()=>{
        getLearnCategoryApi().then(res=>{
            console.log(res)
            learn.categoryList = res.data
        })
    }

    getLearnCategory()
</script>