<template>
    <div ref="powerRef" :style="{'width':width,'height':height}"></div>
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
    const powerRef = ref<HTMLDivElement | null>(null)
    const {setOptions,resize} =  useEcharts(powerRef as Ref<HTMLDivElement>)

    onMounted(()=>{
        var dataMxz = [
            [99,89,100,86,75,84]
        ];
        var lineStyle =  {
                width: 1,
                // opacity: 0.5
        };
        setOptions({
            tooltip: {
                trigger: 'item'
            },
            radar: {
                indicator: [
                    {text: 'html',color: 'rgb(0, 0, 0)',max:100},
                    {text: 'css',color: 'rgb(0, 0, 0)',max:100},
                    {text: 'javascript',color: 'rgb(0, 0, 0)',max:100},
                    {text: 'vue',color: 'rgb(0, 0, 0)',max:100},
                    {text: 'react',color: 'rgb(0, 0, 0)',max:100},
                    {text: 'node',color: 'rgb(0, 0, 0)',max:100}
                ],
                shape: 'circle',
            },
            series: [
                {
                    name: 'superming',
                    type: 'radar',
                    lineStyle: lineStyle,
                    data: dataMxz,
                    symbol: 'none',
                    itemStyle: {
                        color: '#F9713C'
                    },
                    areaStyle: {
                        opacity: 0.25
                    }
                },
            ]
        })
    })

    expose({
        resize
    })

</script>