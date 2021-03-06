<template>
    <div class="m-header">
        <div class="m-header-content">
            <div class="m-header-content-left">
                <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']" @click="collapseClick"></i>
                <breakcrumb :list="breadcrumbList"/>
            </div>
            <div class="m-header-content-right">
                <screenful/>
                <login-info/>
            </div>
        </div>
        <div class="m-header-tabs">
            <tabs :tabs="tabsData" :ActiveTab="activeTab" @removeTab="removeTab" @tabClick="tabClick" class="m-header-tabs-tab"/>
            <drop-down split-button size="medium" :DropDownItem="state.dropdownItem" @menuClick="menuClick">
                <template #title>
                    <span>刷新当前</span>
                </template>
            </drop-down>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed,watch,ref,reactive, onMounted } from 'vue'
    import { useRouter,useRoute } from 'vue-router'
    import type { TabsMenu,Meta,MenuRouteRecordRaw } from '@router/types'
    import type {RouteLocationNormalizedLoaded} from 'vue-router'
    import {settingStore} from '@/store/modules/setting'
    import { tabsStore } from '@/store/modules/tabs'
    import { permissionStore } from '@/store/modules/permission'
    import Tabs from '@/components/element/tabs/index.vue'
    import DropDown from '@/components/element/dropdown/index.vue'
    import screenful from './components/screenfull.vue'
    import LoginInfo from './components/loginInfo.vue'
    import breakcrumb from './components/breadcrumb.vue'

    const router = useRouter()
    const route = useRoute()

    const setting = settingStore()
    const tabs = tabsStore()
    const permission = permissionStore()

    const state = reactive({
        dropdownItem:[{name:'关闭其他',icon:'el-icon-close',command:'other'},{name:'关闭左侧',icon:'el-icon-back',command:'left'},{name:'关闭右侧',icon:'el-icon-right',command:'right'},{name:'关闭全部',icon:'el-icon-circle-close',command:'all'}]
    })

    const activeTab = ref('')
    const breadcrumbList = ref<string[]>([])

    const isCollapse = computed(()=>setting.isCollapse)
    const tabsData = computed(()=>tabs.visitRoutes)

    const collapseClick = ()=>{
        setting.$patch((state)=>{
            state.isCollapse = !isCollapse.value
        })
    }
    //init tab
    const initTab = ()=>{
        const route = filtersInitTab(permission.allowRoutes)[0]
        createTab(route)
    }

    //获取初始化tab
    const filtersInitTab = (routes:MenuRouteRecordRaw[])=>{
        let affix:MenuRouteRecordRaw[] = []
        routes.forEach(item=>{
            if(item.children && affix.length == 0){
                affix = item.children.filter(item=>item.meta.affix)
            }
        })
        return affix
    }
    //tab移除
    const removeTab = (path:string)=>{
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
    const createTab = (route:RouteLocationNormalizedLoaded | MenuRouteRecordRaw)=>{
        breadcrumbList.value = permission.getParentList(route.path)
        const tab:TabsMenu = {
            name:route.meta.title as string,
            path:route.path,
            meta:route.meta as Meta,
            closable:route.meta.closable?true:false
        }
        tabs.addVisitRoute(tab)
        activeTab.value = route.path
    }
    onMounted(()=>{
        initTab()
        createTab(route)
    })
    watch(route,(route)=>{
        createTab(route)
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
                display: flex;
                align-items: center;
                i{
                    font-size:24px;
                    margin-right:10px;
                }
            }
            &-right{
                .flex(flex);
            }
        }
        &-tabs{
            height: 50px;
            .flex(flex);
            padding: 0px 10px;
            &-tab{
                flex: 1;
                margin-right: 10px;
                width: 80%;
            }
        }
    }
</style>