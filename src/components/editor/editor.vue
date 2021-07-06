<template>
    <!-- <el-button @click="resetEditor">dd</el-button> -->
    <div id="editor"></div>
</template>


<script setup lang="ts">
    import {ref, onMounted,defineProps,defineEmit,computed,useContext } from 'vue'
    import type {PropType} from 'vue'
    import editor from '@toast-ui/editor'
    import type {Editor,EditorCore,EditorOptions} from '@toast-ui/editor'
    import { defineOptions } from './defineOptions'
    import '@toast-ui/editor/dist/toastui-editor.css'
    import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
    
    const context = useContext()
    const props = defineProps({
        options:{
            type:Object as PropType<Omit<EditorOptions,'el'>>
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
        editorInstance.value!.addHook('change',()=>{
                emit('update:modelValue',getValue())
        })
    }

    onMounted(()=>{
        const propsOptions = {el:document.getElementById('editor') as HTMLElement,height:props.height}
        const options = Object.assign(propsOptions,defineOptions,props.options)
        console.log(options)
        if(props.modelValue){
            options.initialValue = props.modelValue
        }
        initEditor(options)
    })

    const getValue = ()=>{
        return editorInstance.value!.getMarkdown()
    }

    const resetEditor = ()=>{
        editorInstance.value!.reset()
    }

    // watch(()=>props.modelValue,(newValue)=>{
    //     console.log(newValue)
    //     if(!(newValue == getValue())){
    //         editorInstance.value!.setMarkdown(newValue,false)
    //     }
    // })
    context.expose({
        resetEditor
    })

</script>