<template>
    <el-row :gutter="10" class="m-analysis">
        <el-col :span="6">
            <el-card>
                <template #header>
                    <div>
                        <i class="el-icon-user"></i>
                        <span>后台登录情况</span>
                    </div>
                    <el-tag type="success">周</el-tag>
                </template>
                <login-echarts ref="loginRef"/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <div>
                        <i class="el-icon-message"></i>
                        <span>博客网站留言</span>
                    </div>
                    <el-tag type="success">周</el-tag>
                </template>
                <message-echarts ref="messageRef"/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <div>
                        <i class="el-icon-user"></i>
                        <span>用户新增</span>
                    </div>
                    <Select :option="nearYearData" :selectValue="nearYearData[0]" @change="accountSelectChange"/>
                </template>
                <account-echarts ref="accountRef"/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <div>
                        <i class="el-icon-wind-power"></i>
                        <span>前端能力</span>
                    </div>
                </template>
                <power-echarts ref="powerRef"/>
            </el-card>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-card>
                <template #header>
                    <div>
                        <i class="el-icon-document"></i>
                        <span>文章发布</span>
                    </div>  
                    <Select :option="monthData" :selectValue="monthData[0]" @change="postSelectChange"/>
                </template>
                <post-echarts ref="postRef"/>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import {watch,ref,unref,computed} from 'vue'
    import {settingStore} from '@/store/modules/setting'
    import {getDashboardLoginApi,getDashboardMessageApi,getDashboardPostApi,getDashboardAccountApi} from '@/api/dashboard'
    import postEcharts from './echarts/postEcharts.vue'
    import loginEcharts from './echarts/loginEcharts.vue'
    import accountEcharts from './echarts/accountEcharts.vue'
    import powerEcharts from './echarts/powerEcharts.vue'
    import messageEcharts from './echarts/messageEcharts.vue'
    import Select from '@/components/element/select/index.vue'
    import echarts from '@/lib/echarts'
    const setting = settingStore()

    const loginRef = ref<typeof loginEcharts | null>(null)
    const postRef = ref<typeof postEcharts | null>(null)
    const accountRef = ref<typeof accountEcharts | null>(null)
    const messageRef = ref<typeof messageEcharts | null>(null)
    const powerRef = ref<typeof powerEcharts | null>(null)
    

    const nearYearData = computed(()=>{
        const date = new Date()
        const year = date.getFullYear()
        const fullYear:string[] = []
        for(let i=0;i<3;i++){
            fullYear.push(`${year-i}`)
        }
        return fullYear
    })

    const monthData = computed(()=>{
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const nowFullMonth:string[] = []
        for(let i=1;i<month+1;i++){
            nowFullMonth.push(`${year}-${i}-01`)
        }
        return nowFullMonth.reverse()
    })
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
    //留言统计
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
    //发布统计方法
    const getDashboardPost = (month:string)=>{
        getDashboardPostApi(month).then(res=>{
            const xData:string[] = []
            const articleArr:number[] = []
            const learnArr:number[] = []
            res.data.articleValue.forEach(item=>{
                articleArr.push(item.value)
                xData.push(item._id+'号')
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
    }
    //发布统计
    console.log(monthData.value[0])
    getDashboardPost(monthData.value[0])

    //select change
    const postSelectChange = (value:string)=>{
        getDashboardPost(value)
    }

    const getDashboardAccount = (year:number)=>{
        getDashboardAccountApi(year).then(res=>{
            const accountArr:Record<string,string | number>[] = []

            res.data.forEach((item)=>{
                if(item.type == 'admin' && item._id == 0){
                    accountArr.push({name:'超级管理员',value:item.value})
                }else if(item.type == 'admin' && item._id == 1){
                    accountArr.push({name:'管理员',value:item.value})
                }else{
                    accountArr.push({name:'用户',value:item.value})
                }
            })
            console.log(accountArr)
            accountRef.value?.setOptions({
                series: [
                    {
                        data: accountArr,
                    }
                ]
            })
        })
    }

    getDashboardAccount(parseInt(nearYearData.value[0]))

    const accountSelectChange = (value:string)=>{
        getDashboardAccount(parseInt(value))
    }
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
        unref(accountRef)?.resize(options)
        unref(messageRef)?.resize(options)
        unref(powerRef)?.resize(options)
    }


</script>


<style lang="less" scoped>
    .flex{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .m-analysis{
        margin: 10px 0px;
    }
    i{
        color: #409EFF;
        margin-right: 10px;
        font-size: 18px;
    }
    :deep(.el-card__header){
        height: 60px;
        padding: 10px 20px;
        .flex()
    }
</style>