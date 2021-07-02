<template>
    <div id="editor"></div>
</template>


<script setup lang="ts">
    import {ref, onMounted } from 'vue'
    import editor from '@toast-ui/editor'
    import type {Editor,EditorCore,EditorOptions} from '@toast-ui/editor'
    import '@toast-ui/editor/dist/toastui-editor.css'
    import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
    
    const editorInstance = ref<Editor>()

    const initEditor = (options:EditorOptions):void=>{
        editorInstance.value = new editor({
        ...options
    })
    }

    onMounted(()=>{
        initEditor({
            el:document.getElementById('editor') as HTMLElement,
            initialValue:'this is my blog',
            initialEditType:'markdown',
        })
    })

    const getValue = ()=>{
        return editorInstance.value!.getMarkdown()
    }

</script>