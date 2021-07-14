<template>
    <div ref="viewRef"></div>
</template>

<script setup lang="ts">
    import {ref,onMounted,useContext} from 'vue'
    import type {Ref} from 'vue'
    import {useEcharts} from '@/hooks/useEcharts'
    const {expose} = useContext()
    const viewRef = ref<HTMLDivElement | null>(null)
    const {setOptions,resize} =  useEcharts(viewRef as Ref<HTMLDivElement>)
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
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        })
    })
    expose({
        resize
    })

</script>