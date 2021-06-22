<template>
    <div class="m-header">
        <div class="m-header-content">
            <div class="m-header-content-left">
                <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']" @click="collapseClick"></i>
            </div>
            <div class="m-header-content-right">
                <screenful/>
            </div>
        </div>
        <div class="m-header-tabs">
            <tabs :tabs="tabsData" :ActiveTab="activeTab" @removeTab="removeTab" @tabClick="tabClick"/>
            <drop-down ButtonTitle="刷新当前" size="medium" :DropDownItem="state.dropdownItem" @menuClick="menuClick"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed,watch,ref,reactive } from 'vue'
    import { useRouter,useRoute } from 'vue-router'
    import type { TabsMenu,Meta } from '@router/types'
    import {settingStore} from '@/store/modules/setting'
    import { tabsStore } from '@/store/modules/tabs'
    import Tabs from '@/components/element/tabs/index.vue'
    import DropDown from '@/components/element/dropdown/index.vue'
    import screenful from './components/screenfull.vue'

    const router = useRouter()
    const route = useRoute()

    const setting = settingStore()
    const tabs = tabsStore()

    const state = reactive({
        dropdownItem:[{name:'关闭其他',icon:'el-icon-close',command:'other'},{name:'关闭左侧',icon:'el-icon-back',command:'left'},{name:'关闭右侧',icon:'el-icon-right',command:'right'},{name:'关闭全部',icon:'el-icon-circle-close',command:'all'}]
    })

    const activeTab = ref('')

    const isCollapse = computed(()=>setting.isCollapse)
    const tabsData = computed(()=>tabs.visitRoutes)

    const collapseClick = ()=>{
        setting.$patch((state)=>{
            state.isCollapse = !isCollapse.value
        })
    }
    //tab移除
    const removeTab = (path:string)=>{
        console.log(path)
        if(isActive(path)){
            nextTab(path)
        }
        tabs.delVisitRoute(path)
    }

    const tabClick = (meta:any)=>{
        router.push(meta.name)
    }

    const menuClick = (command:string)=>{
        const path = route.path
        switch(command){
            case 'other':
            tabs.delOtherVisitRoute(path)
            break;
            case 'left':
            tabs.delLeftVisitRoute(path)
            break;
            case 'right':
            tabs.delRightVisitRoute(path)
            break;
            case 'all':
            tabs.delAllVisitRoute()
            break;
        }
    }

    const isActive = (path:string)=>{
        return route.path == path
    }

    const nextTab = (path:string)=>{
        const index = tabs.visitRoutes.findIndex(item=>item.path == path)
        const { path:nextPath } = tabs.visitRoutes[index-1]
        router.push(nextPath)
    }

    watch(route,(route)=>{
        console.log(route)
        const tab:TabsMenu = {
            name:route.meta.title as string,
            path:route.path,
            meta:route.meta as Meta
        }
        tabs.addVisitRoute(tab)
        activeTab.value = route.path
    })

</script>

<style scoped lang="less">
    .flex(flex){
        display: flex;
        align-items: center;
        justify-content: space-between;
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
            border: 1px solid #eee;
            border-radius: 6px;
            padding: 0px 10px;
        }
    }
</style>