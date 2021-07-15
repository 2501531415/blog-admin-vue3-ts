<template>
    <div ref="postRef" :style="{'width':width,'height':height}"></div>
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
    const postRef = ref<HTMLDivElement | null>(null)
    const {setOptions,resize} =  useEcharts(postRef as Ref<HTMLDivElement>)
    onMounted(()=>{
        setOptions({
            tooltip: {
                trigger: 'axis'
            },
            // legend: {
            //     data: ['最高气温', '最低气温']
            // },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 条'
                }
            },
            series: [
                {
                    name: '留言情况',
                    type: 'line',
                    data: [],
                }
            ]
        })
    })
    expose({
        setOptions,
        resize
    })
</script>