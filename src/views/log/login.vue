<template>
    <el-card class="m-log-login">
        <div class="m-log-login-button">
            <el-button type="primary" @click="loginLogDelete">刪除</el-button>
            <el-button type="danger" @click="loginLogDeleteAll">删除当前页</el-button>
        </div>
        <el-table ref="loginLogTableRef" :data="log.loginLogData" tooltip-effect="dark" border @selection-change="handleSelectionChange" @select-all="selectAll">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="admin_id" label="用户ID">
                
            </el-table-column>
            <el-table-column prop="admin_name" label="用户名"></el-table-column>
            <el-table-column prop="create_at" label="登录时间">
                <template #default="scope">
                    <span>{{transformUtc(scope.row.create_at)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ip" label="ip地址"></el-table-column>
        </el-table>
        <div class="m-log-login-pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.page"
                :page-sizes="[5,10, 50, 100, 150]"
                :page-size="pagination.limit"
                :hide-on-single-page="true"
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
    import {error,success} from '@/components/element/notice/message'
    import {messageBox} from '@/components/element/notice/messageBox'
    import { ElTable } from 'element-plus'
    import {transformUtc} from '@/lib/dayjs'

    const log:Record<string,LoginLogParams[]> = reactive({
        loginLogData:[]
    })

    const pagination = reactive({
        page:1,
        limit:10,
        total:0
    })
    const deleteIdList = ref('')
    const selectAllStatus = ref(false)
    const loginLogTableRef = ref<typeof ElTable | null>(null)
    const getLoginLog = ()=>{
        getLoginLogApi(pagination.page,pagination.limit).then(res=>{
            pagination.total = res.total
            log.loginLogData = res.data
        })
    }

    getLoginLog()
    //分页
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
        if(unref(deleteIdList).length == 0){
            return error('请选择删除的日志！')
        }
        deleteLoginLogApi(unref(deleteIdList)).then(res=>{
            if(res.err_code != 200) error('删除日志失败')
            success('删除成功')
            getLoginLog()
        })
    }
    //删除当前页
    const loginLogDeleteAll = ()=>{
        if(!selectAllStatus.value){
            loginLogTableRef.value?.toggleAllSelection()
        }
        messageBox('此操作将永久删除数据, 是否继续?','删除日志',{
            type:'warning',
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            closeOnClickModal:false
        }).then(()=>{
            deleteLoginLogApi(unref(deleteIdList)).then(res=>{
            if(res.err_code != 200) error('删除日志失败')
            success(`删除成功！已删除${res.data.deletedCount}条日志！`)
            selectAllStatus.value = false
            getLoginLog()
        })
        }).catch(action=>{
            loginLogTableRef.value?.toggleAllSelection()
        })
    }
    //全选select
    const selectAll = (e:LoginLogParams[])=>{
        selectAllStatus.value = e.length > 0
    }
    //表格checkbox选择
    const handleSelectionChange = (e:LoginLogParams[])=>{
        console.log(e)
        const list:string[] = []
        e.forEach(item=>{
            list.push(item._id)
        })
        deleteIdList.value = list.join(',')
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