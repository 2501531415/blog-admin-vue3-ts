<template>
    <el-row :gutter="10" class="m-analysis">
        <el-col :span="6">
            <el-card>
                <template #header>
                    <span>后台登录情况</span>
                </template>
                <login-echarts ref="loginRef"/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <span>博客网站留言</span>
                </template>
                <message-echarts ref="messageRef"/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <span>用户新增</span>
                </template>
                <user-echarts ref="userRef"/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <span>前端能力</span>
                </template>
                <power-echarts ref="powerRef"/>
            </el-card>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-card>
                <template #header>
                    <span>文章发布</span>
                </template>
                <post-echarts ref="postRef"/>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import {watch,ref,unref} from 'vue'
    import {settingStore} from '@/store/modules/setting'
    import {getDashboardLoginApi,getDashboardMessageApi,getDashboardPostApi} from '@/api/dashboard'
    import postEcharts from './echarts/postEcharts.vue'
    import loginEcharts from './echarts/loginEcharts.vue'
    import userEcharts from './echarts/userEcharts.vue'
    import powerEcharts from './echarts/powerEcharts.vue'
    import messageEcharts from './echarts/messageEcharts.vue'
    import echarts from '@/lib/echarts'
    const setting = settingStore()

    const loginRef = ref<typeof loginEcharts | null>(null)
    const postRef = ref<typeof postEcharts | null>(null)
    const userRef = ref<typeof userEcharts | null>(null)
    const messageRef = ref<typeof messageEcharts | null>(null)
    const powerRef = ref<typeof powerEcharts | null>(null)

    //登录情况
    getDashboardLoginApi().then(res=>{
        const loginArr:number[] = []
        res.data.forEach(item=>{
            loginArr.push(item.value)
        })
        loginRef.value?.setOptions({
            series: [
                {
                    data:loginArr
                }
            ]
        })
    })

    getDashboardMessageApi().then(res=>{
        const messageArr:number[] = []
        res.data.forEach(item=>{
            messageArr.push(item.value)
        })
        messageRef.value?.setOptions({
            series: [
                {
                    data:messageArr
                }
            ]
        })
    })

    getDashboardPostApi('2021-7-1').then(res=>{
        const xData:number[] = []
        const articleArr:number[] = []
        const learnArr:number[] = []
        res.data.articleValue.forEach(item=>{
            articleArr.push(item.value)
            xData.push(item._id)
        })
        res.data.learnValue.forEach(item=>{
            learnArr.push(item.value)
        })
        postRef.value?.setOptions({
            xAxis:[
                {
                    data:xData
                }
            ],
            series:[
                {
                    data:articleArr
                },
                {
                    data:learnArr
                }
            ]
        })
    })
    //侧边栏变化
    watch(()=>setting.isCollapse,()=>{
        const animation = {
            duration:800,
            delay:0,
        }
        setTimeout(()=>{ 
            echartResize({animation})
        },800)
    })
    //窗口变化
    window.addEventListener('resize',function(){
        echartResize()
    })

    const echartResize = (options?:echarts.ResizeOpts)=>{
        unref(loginRef)?.resize(options)
        unref(postRef)?.resize(options)
        unref(userRef)?.resize(options)
        unref(messageRef)?.resize(options)
        unref(powerRef)?.resize(options)
    }


</script>


<style lang="less" scoped>
    .m-analysis{
        margin: 10px 0px;
    }
</style>