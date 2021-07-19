<template>
    <el-card class="m-log-login">
        <div class="m-log-login-button">
            <el-button type="primary">刪除</el-button>
            <el-button type="danger">删除所有</el-button>
        </div>
        <el-table ref="multipleTable" :data="log.loginLogData" tooltip-effect="dark" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="admin_id" label="用户ID">
                
            </el-table-column>
            <el-table-column prop="admin_name" label="用户名"></el-table-column>
            <el-table-column prop="desc" label="详情"></el-table-column>
        </el-table>
    </el-card>
</template>


<script setup lang="ts">
    import {reactive} from 'vue'
    import {getLoginLogApi,deleteLoginLogApi} from '@/api/log'
    import type {LoginLogParams} from '@/api/model/logModel'
    import {message,error, success} from '@/components/element/notice/message'


    const log:Record<string,LoginLogParams[]> = reactive({
        loginLogData:[]
    })
    getLoginLogApi().then(res=>{
        console.log(res)
        log.loginLogData = res.data.slice(-10)
    })


    const handleSelectionChange = (e:LoginLogParams[])=>{
        // const list:string[] = []
        // e.forEach(item=>{
        //     list.push(item._id)
        // })
        // deleteLoginLogApi(list).then(res=>{
        //     if(res.err_code != 200) error('删除日志失败')
        //     success('删除成功')
        // })

    }
</script>

<style lang="less">
    .m-log-login{
        &-button{
            margin-bottom:10px;
        }
    }
</style>