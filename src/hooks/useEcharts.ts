import {EChartsOption} from 'echarts'
import {unref,nextTick} from 'vue'
import type {Ref} from 'vue'
import echarts from '@/lib/echarts'

export function useEcharts(elRef:Ref<HTMLDivElement>){
    let echartsInstance:echarts.ECharts | null = null

    function initEecharts(){
        echartsInstance = echarts.init(unref(elRef))
    }

    function setOptions(options:EChartsOption){
        nextTick(()=>{
            if(!echartsInstance) initEecharts()
            echartsInstance?.setOption(options)
            return echartsInstance
        })
    }
    function resize(options?:echarts.ResizeOpts){
        echartsInstance?.resize(options)
    }
    return {
        setOptions,
        echarts,
        resize
    }

}