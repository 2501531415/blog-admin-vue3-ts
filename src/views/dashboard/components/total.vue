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
                <CountTo :startVal="0" :endVal="total.likes"/>
                <div>
                    <span>点赞</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="total.comments"/>
                <div>
                    <span>评论</span>
                </div>
            </div>
        </el-col>
        <el-col :span="10" class="m-total-gutter">
            <div class="m-total-center">
                <div class="m-total-item">
                <CountTo :startVal="0" :endVal="total.article"/>
                <div>
                    <span>文章</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="total.learn"/>
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
                <CountTo :startVal="0" :endVal="total.admin + total.user"/>
                <div>
                    <span>账号</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <div class="m-total-item-manage">
                    <span>{{total.admin}}</span>
                    <span>管理</span>
                </div>
                <div class="m-total-item-manage">
                    <span>{{total.user}}</span>
                    <span>用户</span>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import {reactive} from 'vue'
    import {getDashboardTotalApi} from '@/api/dashboard'
    import CountTo from '@/components/CountTo/index.vue'
    type totalType = {
        views:number,
        comments:number,
        likes:number,
        article:number,
        learn:number,
        message:number,
        admin:number,
        user:number,

    }
    
    const total = reactive<totalType>({
        views:0,
        comments:0,
        likes:0,
        article:0,
        learn:0,
        message:0,
        admin:0,
        user:0,
    })
    getDashboardTotalApi().then(res=>{
        console.log(res)
        res.data.article_meta_total.forEach(item=>{
            total.views += item.views_total
            total.comments += item.comments_total
            total.likes += item.likes_total
        })
        res.data.learn_meta_total.forEach(item=>{
            total.views += item.views_total
            total.comments += item.comments_total
            total.likes += item.likes_total
        })
        total.message = res.data.message_total
        total.article = res.data.article_total
        total.learn = res.data.learn_total
        total.user = res.data.user_total
        total.admin = res.data.admin_total
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