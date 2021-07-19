<template>
    <el-card class="m-log-login">
        <div class="m-log-login-button">
            <el-button type="primary" @click="loginLogDelete">刪除</el-button>
            <el-button type="danger">删除所有</el-button>
        </div>
        <el-table ref="multipleTable" :data="log.loginLogData" tooltip-effect="dark" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="admin_id" label="用户ID">
                
            </el-table-column>
            <el-table-column prop="admin_name" label="用户名"></el-table-column>
            <el-table-column prop="desc" label="详情"></el-table-column>
        </el-table>
        <div class="m-log-login-pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.page"
                :page-sizes="[5,10, 50, 100, 150]"
                :page-size="pagination.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>
    </el-card>
</template>


<script setup lang="ts">
    import {reactive,ref,unref} from 'vue'
    import {getLoginLogApi,deleteLoginLogApi} from '@/api/log'
    import type {LoginLogParams} from '@/api/model/logModel'
    import {message,error, success} from '@/components/element/notice/message'


    const log:Record<string,LoginLogParams[]> = reactive({
        loginLogData:[]
    })

    const pagination = reactive({
        page:1,
        limit:10,
        total:0
    })
    const delelteIdList = ref('')
    const getLoginLog = ()=>{
        getLoginLogApi(pagination.page,pagination.limit).then(res=>{
            pagination.total = res.total
            log.loginLogData = res.data
        })
    }

    getLoginLog()

    const handleSizeChange = (limit:number)=>{
        pagination.limit = limit
        getLoginLog()
    }

    const handleCurrentChange = (page:number)=>{
        pagination.page = page
        getLoginLog()
    }
    //删除
    const loginLogDelete = ()=>{
        if(unref(delelteIdList).length == 0){
            return error('请选择删除的日志！')
        }
        deleteLoginLogApi(unref(delelteIdList)).then(res=>{
            if(res.err_code != 200) error('删除日志失败')
            success('删除成功')
            getLoginLog()
        })
    }
    const handleSelectionChange = (e:LoginLogParams[])=>{
        console.log(e)
        const list:string[] = []
        e.forEach(item=>{
            list.push(item._id)
        })
        delelteIdList.value = list.join(',')
    }
</script>

<style lang="less">
    .m-log-login{
        &-button{
            margin-bottom:10px;
        }
        &-pagination{
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }
    }
</style>