<template>
    <div id="editor" :style="{'height':height}"></div>
</template>

<script setup lang="ts">

    import {defineProps,ref,onMounted,defineEmit,watch,onUnmounted} from 'vue'
    import type {PropType} from 'vue'
    import vditor from 'vditor'
    import 'vditor/dist/index.css'

    const props = defineProps({
        modelValue:{
            type:String as PropType<string>,
            default:''
        },
        height:{
            type:String as PropType<string>,
            default:'300px'
        }
        
    })

    const emit = defineEmit({'update:modelValue':(value:string)=>{
        if(value){
            return true
        }
    }})
    
    const editorInstance = ref<Nullable<vditor>>(null)

    onMounted(()=>{
        editorInstance.value = new vditor('editor',{
            theme:'classic',
            value:props.modelValue,
            mode: 'sv',
            preview: {
                actions: [],
            },
            fullscreen:{
                index:9999
            },
            input:(value)=>{
                emit('update:modelValue',value)
            }
        })
    })
    onUnmounted(()=>{
        if(editorInstance.value){
            editorInstance.value!.destroy()
        }
    })

    const getValue = ()=>{
        return editorInstance.value!.getValue()
    }
    watch(()=>props.modelValue,(newValue)=>{
        console.log(newValue)
        if(newValue != getValue()){
            editorInstance.value!.setValue(newValue)
        }
    })

</script>