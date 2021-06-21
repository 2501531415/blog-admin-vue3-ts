<template>
    <div class="m-header">
        <div class="m-header-content">
            <div class="m-header-content-left">
                <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']" @click="collapseClick"></i>
            </div>
        </div>
        <div class="m-header-tabs">
            33333
        </div>
    </div>
</template>

<script setup lang="ts">
import {appStore} from '@/store/modules/app'
import { computed,watch } from 'vue'
import { useRouter,useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const app = appStore()

const isCollapse = computed(()=>app.isCollapse)

const collapseClick = ()=>{
    app.$patch((state)=>{
        state.isCollapse = !isCollapse.value
    })
}

watch(route,(value)=>{
    console.log(value)
})

</script>

<style scoped lang="less">
    .m-header{
        &-content{
            height:60px;
            display: flex;
            align-items: center;
            &-left{
                i{
                    font-size:24px;
                }
            }
        }
        &-tabs{
            height: 50px;
        }
    }
</style>