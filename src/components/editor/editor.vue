<template>
    <div id="editor" :style="{'height':height}"></div>
</template>


<script setup lang="ts">
    import {ref, onMounted,defineProps,defineEmit,computed } from 'vue'
    import type {PropType} from 'vue'
    import editor from '@toast-ui/editor'
    import type {Editor,EditorCore,EditorOptions} from '@toast-ui/editor'
    import { defineOptions } from './defineOptions'
    import '@toast-ui/editor/dist/toastui-editor.css'
    import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
    
    const props = defineProps({
        options:{
            type:Object as PropType<Omit<EditorOptions,'el'|'height'>>
        },
        modelValue:{
            type:String as PropType<string>,
            default:''
        },
        height:{
            type:String,
            default:'300px'
        }
    })

    const emit = defineEmit({'update:modelValue':(value:string)=>{
        if(value){
            return true
        }
    }})

    const editorInstance = ref<Editor>()

    const initEditor = (options:EditorOptions):void=>{
        editorInstance.value = new editor({
        ...options
    })
    }

    onMounted(()=>{
        const propsOptions = {el:document.getElementById('editor') as HTMLElement,height:props.height}
        const options = Object.assign(propsOptions,defineOptions,props.options)
        console.log(options)
        options.initialValue = props.modelValue
        initEditor(options)
        editorInstance.value!.addHook('change',()=>{
            emit('update:modelValue',getValue())
    })
    })

    const getValue = ()=>{
        return editorInstance.value!.getMarkdown()
    }

    // watch(()=>props.modelValue,(newValue)=>{
    //     console.log(newValue)
    //     if(!(newValue == getValue())){
    //         editorInstance.value!.setMarkdown(newValue,false)
    //     }
    // })

</script>