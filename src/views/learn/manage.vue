<template>
    <el-card class="m-learn">
        <div class="m-learn-show">
            <div class="m-learn-show-item">
                <span>全部笔记：</span>
                <span>{{show.all}}</span>
            </div>
            <div class="m-learn-show-item">
                <span>已发布：</span>
                <span>{{show.post}}</span>
            </div>
            <div class="m-learn-show-item">
                <span>草稿箱：</span>
                <span>{{show.draft}}</span>
            </div>
        </div>
        <div class="m-learn-search">
            <el-row :gutter="20">
                <el-col :xs="12" :sm="12" :md="8" :lg="8">
                    <el-input  prefix-icon="el-icon-search" v-model="searchValue" placeholder="请输入搜索内容"></el-input>
                </el-col>
                <el-col :xs="12" :sm="12" :md="8" :lg="8">
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                    <el-button type="primary" @click="onSearchReset">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="learn.learnList" v-loading="tableLoading" border empty-text="无用户内容" stripe height="calc(100vh - 370px)" style="width: 100%">
            <el-table-column label="封面">
                <template #default="scope">
                    <img :src="baseUrl + scope.row.img_url" alt="" class="m-learen-table-img">
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="作者" prop="author" width="100"></el-table-column>
            <el-table-column label="描述" prop="desc"></el-table-column>
            <el-table-column label="类型" prop="type" width="100">
                <template #default="scope">
                    <el-tag effect="dark"><span>{{ scope.row.type }}</span></el-tag>
                </template>
            </el-table-column>
            <el-table-column label="关键字" prop="type">
                <template #default="scope">
                    <el-tag effect="dark" v-for="item in scope.row.keyWord.split(',')" :key="item"><span>{{item}}</span></el-tag>
                </template>
            </el-table-column>
            <el-table-column label="字数" prop="number" width="100"></el-table-column>
            <el-table-column label="浏览数" prop="meta.views" width="100"></el-table-column>
            <el-table-column label="状态" prop="type" width="100">
                <template #default="scope">
                    <el-tag effect="dark" :type="scope.row.status == 0?'danger':''"><span>{{scope.row.status == 0?'已发布':'草稿箱'}}</span></el-tag>
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template #default="scope">
                    <span>{{transformUtc(scope.row.updated_time)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="info"
                    @click="handleWatch(scope.row)">预览</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Drawer :title="drawerTitle" :drawer-visiable="previewDrawerVisiable" @close="drawerClosed" :DestroyOnClose="true">
            <div v-html="previewText" class="m-learn-preview"></div>
        </Drawer>
    </el-card>
</template>

<script setup lang="ts">
    import {ref,reactive,computed,unref} from 'vue'
    import {useRouter} from 'vue-router'
    import {getLearnListApi,deleteLearnApi} from '@/api/learn'
    import type {LearnParams} from '@/api/model/learnModel'
    import {transformUtc} from '@/lib/dayjs'
    import {success,error,warning} from '@/components/element/notice/message'
    import {messageBox} from '@/components/element/notice/messageBox'
    import Drawer from '@/components/element/drawer/index.vue'
    import marked from 'marked'

    type LearnType = {
        learnList:LearnParams[]
    }
    const router = useRouter()
    const learn:LearnType = reactive({
        learnList:[]
    })
    const show = reactive({
        all:0,
        post:0,
        draft:0,
        flag:true
    })
    const previewText = ref('')
    const searchValue = ref('')
    const previewDrawerVisiable = ref(false)
    const drawerTitle = ref('')
    const tableLoading = ref(true)
    const baseUrl = computed(()=>import.meta.env.VITE_GLOB_IMG_URL)

    const getLearnList = (query?:string)=>{
        getLearnListApi(query).then(res=>{
            tableLoading.value = false
            learn.learnList = res.data
           if(show.flag){
                show.all = res.data.length
                show.draft = res.data.filter(item=>item.status == 1).length
                show.post = show.all - show.draft
                show.flag = false
            }
        })
    }

    getLearnList()


    const onSearch = ()=>{
        if(unref(searchValue).length == 0) return warning('请输入搜索内容')
        getLearnList(unref(searchValue))
    }

    const onSearchReset = ()=>{
        searchValue.value = ''
        getLearnList()
    }

    const handleEdit = (scope:Required<LearnParams>)=>{
        router.push(`/learn/manage/${scope._id}`)
    }

    const handleWatch = (scope:Required<LearnParams>)=>{
        previewText.value = marked(scope.content)
        drawerTitle.value = scope.title
        previewDrawerVisiable.value = true
    }
    const drawerClosed = ()=>{
        previewDrawerVisiable.value = false,
        previewText.value = ''
    }

    const handleDelete = (scope:Required<LearnParams>)=>{
        messageBox('此操作将永久删除该笔记, 是否继续?','删除笔记',{
            type:'warning',
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            closeOnClickModal:false
        }).then(()=>{
            deleteLearnApi(scope._id).then(res=>{
                if(res.err_code !=200) return error('删除失败！')
                success('删除成功！')
                learn.learnList = learn.learnList.filter(item=>item._id != scope._id)
                show.all = show.all - 1
                if(scope.status == 0){ //0 or 1
                    show.post = show.post - 1
                }else{
                    show.draft = show.draft - 1
                }
            })
        })
    }
</script>

<style lang="less">
.m-learn{
    &-show{
        display: flex;
        justify-items: center;
        border: 1px solid #eee;
        &-item{
            padding: 20px;
            text-align: center;
            font-size: 18px;
            span:last-child{
                color:red;
            }
        }
    }
    &-search{
        margin:10px 0px;
    }
    &-preview{
        padding:0px 10px
    }
}
.m-learen-table-img{
    width:150px;
    height:80px
}
.el-tag+.el-tag{
    margin-left:10px;
}

</style>