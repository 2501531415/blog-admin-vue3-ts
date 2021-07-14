<template>
    <el-row :gutter="10" class="m-analysis">
        <el-col :span="6">
            <el-card>
                <template #header>
                    <span>网站访问</span>
                </template>
                <view-echarts ref="viewRef" class="m-analysis-echarts"/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <span>网站留言</span>
                </template>
                <message-echarts ref="messageRef" class="m-analysis-echarts"/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <span>用户新增</span>
                </template>
                <user-echarts ref="userRef" class="m-analysis-echarts"/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <span>前端能力</span>
                </template>
                <power-echarts ref="powerRef" class="m-analysis-echarts"/>
            </el-card>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-card>
                <template #header>
                    <span>文章发布</span>
                </template>
                <post-echarts ref="postRef" class="m-analysis-post-echarts"/>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import {watch,ref,unref} from 'vue'
    import {settingStore} from '@/store/modules/setting'
    import postEcharts from './echarts/postEcharts.vue'
    import viewEcharts from './echarts/viewEcharts.vue'
    import userEcharts from './echarts/userEcharts.vue'
    import powerEcharts from './echarts/powerEcharts.vue'
    import messageEcharts from './echarts/messageEcharts.vue'
    import echarts from '@/lib/echarts'
    const setting = settingStore()

    const viewRef = ref<typeof viewEcharts | null>(null)
    const postRef = ref<typeof postEcharts | null>(null)
    const userRef = ref<typeof userEcharts | null>(null)
    const messageRef = ref<typeof messageEcharts | null>(null)
    const powerRef = ref<typeof powerEcharts | null>(null)

    const echartResize = (options?:echarts.ResizeOpts)=>{
        unref(viewRef)?.resize(options)
        unref(postRef)?.resize(options)
        unref(userRef)?.resize(options)
        unref(messageRef)?.resize(options)
        unref(powerRef)?.resize(options)
    }

    watch(()=>setting.isCollapse,()=>{
        const animation = {
            duration:800,
            delay:0,
        }
        setTimeout(()=>{
            echartResize({animation})
        },800)
    })

    window.addEventListener('resize',function(){
        echartResize()
    })
    


</script>


<style lang="less" scoped>
    .m-analysis{
        margin: 10px 0px;
        &-echarts{
            width: 100%;
            height:300px;
        }
        &-post-echarts{
            width: 100%;
            height:400px;
        }
    }
</style>