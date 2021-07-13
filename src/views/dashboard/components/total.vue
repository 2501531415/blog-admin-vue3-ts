<template>
    <div class="m-total">
        <div class="m-total-left">
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="3000"/>
                <div>
                    <span>views</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="3000"/>
                <div>
                    <span>views</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="3000"/>
                <div>
                    <span>views</span>
                </div>
            </div>
        </div>
        <div class="m-total-center">
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="3000"/>
                <div>
                    <span>views</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="3000"/>
                <div>
                    <span>views</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="3000"/>
                <div>
                    <span>views</span>
                </div>
            </div>
        </div>
        <div class="m-total-right">
            <div class="m-total-item">
                <CountTo :startVal="0" :endVal="3000"/>
                <div>
                    <span>views</span>
                </div>
            </div>
            <div class="m-total-line"></div>
            <div class="m-total-item">
                <div>
                    <span>10 admin</span>
                </div>
                <div>
                    <span>20 admin</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
     import CountTo from '@/components/CountTo/index.vue'


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
    }
    .m-total{
        .flex();
        &-left{
            flex:1;
            .common();
        }
        &-center{
            .common();
            flex:1;
            margin: 0px 20px;
        }
        &-right{
            .common();
        }
        &-item{
            padding:40px 20px;
        }
        &-line{
            width: 1px;
            height: 60px;
            background-color: #eee;
        }
    }

</style>