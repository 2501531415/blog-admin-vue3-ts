<template>
    <el-card class="m-message">
        <div class="m-message-button">
            <el-button type="primary" @click="messageDelete">刪除</el-button>
            <el-button type="danger" @click="messageDeleteAll">删除当前页</el-button>
        </div>
        <el-table ref="messageTableRef" :data="message.messageData" tooltip-effect="dark" border @selection-change="handleSelectionChange" @select-all="selectAll">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="头像" width="100" align="center">
                <template #default="scope">
                    <img :src="baseUrl+scope.row.avatar" alt="" style="width: 40px;height:40px">
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="200"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column label="留言时间">
                <template #default="scope">
                    <span>{{transformUtc(scope.row.created_time)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ip" label="ip地址"></el-table-column>
        </el-table>
        <div class="m-message-pagination">
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
    import {reactive,ref,unref,computed} from 'vue'
    import {getMessageApi,deleteMessageApi} from '@/api/message'
    import type {MessageParams} from '@/api/model/messageModel'
    import {error,success} from '@/components/element/notice/message'
    import {messageBox} from '@/components/element/notice/messageBox'
    import { ElTable } from 'element-plus'
    import {transformUtc} from '@/lib/dayjs'

    const message:Record<string,MessageParams[]> = reactive({
        messageData:[]
    })

    const pagination = reactive({
        page:1,
        limit:10,
        total:0
    })
    const deleteIdList = ref('')
    const selectAllStatus = ref(false)
    const messageTableRef = ref<typeof ElTable | null>(null)

    const baseUrl = computed(()=>import.meta.env.VITE_GLOB_IMG_URL)

    const getMessage = ()=>{
        getMessageApi(pagination.page,pagination.limit).then(res=>{
            pagination.total = res.total
            message.messageData = res.data
        })
    }

    getMessage()
    //分页
    const handleSizeChange = (limit:number)=>{
        pagination.limit = limit
        getMessage()
    }

    const handleCurrentChange = (page:number)=>{
        pagination.page = page
        getMessage()
    }
    //删除
    const messageDelete = ()=>{
        if(unref(deleteIdList).length == 0){
            return error('请选择删除的日志！')
        }
        deleteMessageApi(unref(deleteIdList)).then(res=>{
            if(res.err_code != 200) error('删除日志失败')
            success('删除成功')
            getMessage()
        })
    }
    //删除当前页
    const messageDeleteAll = ()=>{
        if(!selectAllStatus.value){
            messageTableRef.value?.toggleAllSelection()
        }
        messageBox('此操作将永久删除数据, 是否继续?','删除日志',{
            type:'warning',
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            closeOnClickModal:false
        }).then(()=>{
            deleteMessageApi(unref(deleteIdList)).then(res=>{
            if(res.err_code != 200) error('删除日志失败')
            success(`删除成功！已删除${res.data.deletedCount}条日志！`)
            selectAllStatus.value = false
            getMessage()
        })
        }).catch(action=>{
            messageTableRef.value?.toggleAllSelection()
        })
    }
    //全选select
    const selectAll = (e:MessageParams[])=>{
        selectAllStatus.value = e.length > 0
    }
    //表格checkbox选择
    const handleSelectionChange = (e:MessageParams[])=>{
        console.log(e)
        const list:string[] = []
        e.forEach(item=>{
            list.push(item._id)
        })
        deleteIdList.value = list.join(',')
    }
</script>

<style lang="less">
    .m-message{
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