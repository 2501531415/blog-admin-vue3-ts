<template>
    <el-row :gutter="20">
        <el-col  :xs="12" :sm="8" :md="6" :lg="6" class="m-col">
            <el-card class="m-col-card-list-add" @click="add">
                <i  class="el-icon-plus avatar-uploader-icon"></i>
                <span>添加分类</span>
            </el-card>
        </el-col>
        <el-col v-for="item in cardList" :key="item._id" :xs="12" :sm="8" :md="6" :lg="6" class="m-col">
            <el-card class="m-col-card-list">
                <img :src="baseUrl+item.imgUrl" alt="">
                <div class="m-col-card-list-contain">
                    <div class="m-col-card-list-contain-title">{{item.name}}</div>
                    <div class="m-col-card-list-contain-bottom">
                        <el-tag>{{item.type}}</el-tag>
                        <el-button type="warning" size="small" @click="deleteCard(item._id)">删除</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import {defineProps,computed,defineEmit} from 'vue'
    import type {PropType} from 'vue'
    type CardListType = {
        _id:string,
        name:string,
        imgUrl:string,
        type:string,
        [index:string]:any
    }

    const props = defineProps({
        cardList:{
            type:Array as PropType<CardListType[]>,
            default:[]
        }
    })

    const emit = defineEmit({'add':null,'delete':(id:string)=>{
        if(id){
            return true
        }
    }})
    const baseUrl = computed(()=>import.meta.env.VITE_GLOB_IMG_URL)

    const add = ()=>{
        emit('add')
    }

    const deleteCard = (id:string)=>{
        emit('delete',id)
    }

    

</script>

<style lang="less">
.m-col{
    margin-top: 10px;
    &-card-list-add{
        height:100%;
        cursor: pointer;
        span{
            margin-left:8px;
        }
        .el-card__body{
            padding:0px!important;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            i{
                font-size: 18px;
            }
        }
        &:hover{
            border: 1px dashed #409EFF;
            color: #409EFF;
        }
    }
    &-card-list{
    // margin-top: 10px;
    &:hover{
        box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%);
    }
    img{
        width:100%;
        height:100%;
        min-height: 200px;
        max-height: 200px;
    }
    &-contain{
        padding:10px;
        &-title{
            padding: 10px 0px;
        }
        &-bottom{
            border-top:1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top:10px;
        }
    }
    .el-card__body{
        padding:0px!important;
    }
}
}


</style>