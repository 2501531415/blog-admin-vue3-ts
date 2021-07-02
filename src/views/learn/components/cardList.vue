<template>
    <el-row :gutter="20">
        <el-col v-for="item in cardList" :key="item._id" :xs="12" :sm="8" :md="6" :lg="6">
            <el-card class="m-card-list">
                <img :src="baseUrl+item.imgUrl" alt="">
                <div class="m-card-list-contain">
                    <div class="m-card-list-contain-title">{{item.name}}</div>
                    <div class="m-card-list-contain-bottom">
                        <el-tag>{{item.type}}</el-tag>
                        <el-button type="warning" size="small">删除</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import {defineProps,computed} from 'vue'
    import type {PropType} from 'vue'
    type CardListType = {
        _id?:string,
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

    const baseUrl = computed(()=>import.meta.env.VITE_GLOB_IMG_URL)

</script>

<style lang="less">
.m-card-list{
    margin-top: 10px;
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
        }
    }
    .el-card__body{
        padding:0px!important;
    }
}

</style>