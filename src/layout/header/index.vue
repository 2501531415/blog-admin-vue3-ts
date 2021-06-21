<template>
    <div class="m-header">
        <div class="m-header-content">
            <div class="m-header-content-left">
                <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']" @click="collapseClick"></i>
            </div>
        </div>
        <div class="m-header-tabs">
            <tabs :tabs="tabsData" @removeTab="removeTab" @tabClick="tabClick"/>
            <drop-down ButtonTitle="关闭当前" :DropDownItem="state.dropdownItem"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed,watch,ref,reactive } from 'vue'
    import { useRouter,useRoute } from 'vue-router'
    import type { TabsMenu,Meta } from '@router/types'
    import {appStore} from '@/store/modules/app'
    import { tabsStore } from '@/store/modules/tabs'
    import Tabs from '@/components/element/tabs/index.vue'
    import DropDown from '@/components/element/dropdown/index.vue'

    const router = useRouter()
    const route = useRoute()

    const app = appStore()
    const tabs = tabsStore()

    const state = reactive({
        dropdownItem:[{name:'关闭其他',icon:'el-icon-close',command:'other'},{name:'关闭左侧',icon:'el-icon-back',command:'left'},{name:'关闭右侧',icon:'el-icon-right',command:'right'},{name:'关闭全部',icon:'el-icon-circle-close',command:'all'}]
    })

    const isCollapse = computed(()=>app.isCollapse)
    const tabsData = computed(()=>tabs.visitRoutes)

    const collapseClick = ()=>{
        app.$patch((state)=>{
            state.isCollapse = !isCollapse.value
        })
    }
    //tab移除
    const removeTab = (path:string)=>{
        console.log(path)
        tabs.delVisitRoute(path)
    }

    const tabClick = (meta:any)=>{
        router.push(meta.name)
    }
    watch(route,(route)=>{
        console.log(route)
        const tab:TabsMenu = {
            name:route.meta.title as string,
            path:route.path,
            meta:route.meta as Meta
        }
        tabs.addVisitRoute(tab)
    })

</script>

<style scoped lang="less">
    .flex(flex){
        display: flex;
        align-items: center;
    }
    .m-header{
        background-color: #fff;
        &-content{
            height:60px;
            .flex(flex);
            &-left{
                i{
                    font-size:24px;
                }
            }
        }
        &-tabs{
            height: 50px;
            .flex(flex);
            justify-content: space-between;
        }
    }
</style>