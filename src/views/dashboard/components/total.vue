<template>
    <el-row class="m-total">
        <el-col :span="10" class="m-total-left">
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="total.views"/>
                <div>
                    <span>浏览</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="600"/>
                <div>
                    <span>点赞</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="500"/>
                <div>
                    <span>评论</span>
                </div>
            </div>
        </el-col>
        <el-col :span="10" class="m-total-gutter">
            <div class="m-total-center">
                <div class="m-total-item">
                <CountTo :startVal="0" :endVal="200"/>
                <div>
                    <span>文章</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="300"/>
                <div>
                    <span>笔记</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="total.message"/>
                <div>
                    <span>留言</span>
                </div>
            </div>
            </div>
        </el-col>
        <el-col :span="4" class="m-total-right">
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="50"/>
                <div>
                    <span>账号</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <div class="m-total-item-manage">
                    <span>10</span>
                    <span>管理</span>
                </div>
                <div class="m-total-item-manage">
                    <span>40</span>
                    <span>用户</span>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import {defineProps} from 'vue'
    import type {PropType} from 'vue'
    import CountTo from '@/components/CountTo/index.vue'
    type totalType = {
        views:number,
        comments:number,
        likes:number,
        article:number,
        learn:number,
        message:number,
        draft:number,
        post:number,

    }
    const props = defineProps({
        total:{
            type:Object as PropType<totalType>,
            default:()=>{
                return {
                    views:0,
                    comments:0,
                    likes:0,
                    article:0,
                    learn:0,
                    message:0,
                    draft:0,
                    post:0,
                }
            }
        }
    })


</script>

<style lang="less">
    .flex{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .common{
        .flex();
        background-color: #fff;
        border-radius: 5px;
    }
    .m-total{
        &-left{
            .common();
        }
        &-center{
            .common();
        }
        &-right{
            .common();
        }
        &-gutter{
            padding:0px 10px;
        }
        &-item{
            padding:40px 20px;
            .flex();
            flex-direction: column;
            &-manage{
                white-space: nowrap;
                &:first-child{
                    margin-bottom: 10px;
                }
                span{
                    margin-right: 10px;
                }
            }
        }
        &-line{
            width: 1px;
            height: 60px;
            background-color: #eee;
        }
    }

</style>