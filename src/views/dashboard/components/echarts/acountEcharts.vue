<template>
    <div ref="acountRef" :style="{'width':width,'height':height}"></div>
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
    const acountRef = ref<HTMLDivElement | null>(null)
    const {setOptions,resize} =  useEcharts(acountRef as Ref<HTMLDivElement>)
    onMounted(()=>{
        setOptions( {
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: '账号新增',
                    type: 'pie',
                    radius: '50%',
                    data: [],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })
    })

    expose({
        setOptions,
        resize
    })

</script>