<template>
    <template :key="tag" v-for="tag in Tags">
      <el-tag
      closable
      :disable-transitions="false"
      @close="handleClose(tag)" v-if="tag.length > 0">
      {{tag}}
    </el-tag>
    </template>
  <el-input
    class="input-new-tag"
    v-if="inputVisible"
    v-model="inputValue"
    ref="inputRef"
    size="small"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  >
  </el-input>
  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
</template>
  
<script setup lang="ts">
    import {defineProps,ref,unref,defineEmit,nextTick} from 'vue'
    import type {PropType} from 'vue'
    
    const props = defineProps({
        Tags:{
            type:Array as PropType<string[]>,
            default:[]
        }
    })
    const emit = defineEmit({'close':(tag:string)=>{
        if(tag){
            return true
        }
    },'add':(value:string)=>{
        if(value){
            return true
        }
    }})
    const inputVisible = ref(false)
    const inputValue = ref('')
    const inputRef:any = ref(null)
          
    const handleClose = (tag:string)=>{
        emit('close',tag)
    }
  
    const showInput = ()=>{
      inputVisible.value = true;
      nextTick(()=>{
        inputRef.value.focus();
      })
      
    }

    const handleInputConfirm = ()=>{
      if (unref(inputValue)) {
        emit('add',unref(inputValue))
      }
      inputVisible.value = false;
      inputValue.value = '';
    }
</script>

<style>
.input-new-tag{
    width:90px;
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.button-new-tag{
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0
}
.el-tag+.el-tag{
  margin-left: 10px;
}
</style>