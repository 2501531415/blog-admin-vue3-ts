<template>
    <div ref="loginRef" :style="{'width':width,'height':height}"></div>
</template>

<script setup lang="ts">
    import {ref,onMounted,useContext,defineProps} from 'vue'
    import type {Ref,PropType} from 'vue'
    import {useEcharts} from '@/hooks/useEcharts'
    const {expose} = useContext()

    const props = defineProps({
        width:{
            type:String as PropType<string>,
            default:'100%'
        },
        height:{
            type:String as PropType<string>,
            default:'300px'
        }
    })
    const loginRef = ref<HTMLDivElement | null>(null)
    const {setOptions,resize} =  useEcharts(loginRef as Ref<HTMLDivElement>)

    onMounted(()=>{
        setOptions({
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: []
                }
            ]
        })
    })
    expose({
        setOptions,
        resize
    })

</script>