<template>
    <el-card>
        <Description title="项目信息" size="medium" :desc-data="projectDesc"/>
        <Description title="生产环境依赖" size="medium" :desc-data="prodDesc" style="margin:10px 0px"/>
        <Description title="开发环境依赖" size="medium" :desc-data="devDesc"/>
    </el-card>
</template>


<script setup lang="ts">
    import {ref,computed} from 'vue'
    import type {DescType} from '@/components/element/descriptions/types'
    import Description from '@/components/element/descriptions/index.vue'
    import {formate} from '@/lib/dayjs'
    
    const prodDesc = computed(()=>{
        const prodList:DescType[] = []
        const {dependencies} = __APP_INFO__.pkg
        Object.keys(dependencies).forEach(item=>{
            prodList.push({label:item,value:dependencies[item]})
        })
        return prodList
    })

    const devDesc = computed(()=>{
        const devList:DescType[] = []
        const {devDependencies} = __APP_INFO__.pkg
        Object.keys(devDependencies).forEach(item=>{
            devList.push({label:item,value:devDependencies[item]})
        })
        return devList
    })
    
    const projectDesc = computed(()=>{
        const {name,version} = __APP_INFO__.pkg
        const {lastBuildTime} = __APP_INFO__
        return [{label:'项目名称',value:name},{label:'版本号',value:version},{label:'最后更新时间',value:formate(lastBuildTime)}]
    })
</script>