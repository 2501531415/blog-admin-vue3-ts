<template>
    <el-card class="m-article">
        <div class="m-article-show">
            <div class="m-article-show-item">
                <span>全部笔记：</span>
                <span>{{show.all}}</span>
            </div>
            <div class="m-article-show-item">
                <span>已发布：</span>
                <span>{{show.post}}</span>
            </div>
            <div class="m-article-show-item">
                <span>草稿箱：</span>
                <span>{{show.draft}}</span>
            </div>
        </div>
        <div class="m-article-search">
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
        <el-table :data="article.articleList" border empty-text="无用户内容" stripe height="calc(100vh - 370px)" style="width: 100%">
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
            <el-table-column label="来源" prop="origin"></el-table-column>
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
        <!-- <Dialog :DialogVisible="previewDialogVisiable" :fullscreen="true" @cancle="previewDialogClose" @closed="previewDialogClose" @submit="previewDialogClose">
            <div v-html="previewText" v-highlight></div>
        </Dialog> -->
        <Drawer :title="previewTitle" :drawer-visiable="previewDrawerVisiable" @close="drawerClosed">
            <div v-html="previewText" class="m-article-preview"></div>
        </Drawer>
    </el-card>
</template>

<script setup lang="ts">
    import {ref,reactive,computed,unref} from 'vue'
    import {useRouter} from 'vue-router'
    import {getArticleListApi,deleteArticleApi} from '@/api/article'
    import type {ArticleParams} from '@/api/model/articleModel'
    import {transformUtc} from '@/lib/dayjs'
    import {success,error,warning} from '@/components/element/notice/message'
    import {messageBox} from '@/components/element/notice/messageBox'
    import Drawer from '@/components/element/drawer/index.vue'
    import marked from 'marked'
    // import Editor from '@/components/editor/editor.vue'

    type ArticleType = {
        articleList:ArticleParams[]
    }
    const router = useRouter()
    const article:ArticleType = reactive({
        articleList:[]
    })
    const show = reactive({
        all:0,
        post:0,
        draft:0,
        flag:true
    })
    const previewText = ref('')
    const searchValue = ref('')
    const previewTitle = ref('')
    const previewDrawerVisiable = ref(false)
    const baseUrl = computed(()=>import.meta.env.VITE_GLOB_IMG_URL)

    const getArticleList = (query?:string)=>{
        getArticleListApi(query).then(res=>{
            article.articleList = res.data
           if(show.flag){
                show.all = res.data.length
                show.draft = res.data.filter(item=>item.status == 1).length
                show.post = show.all - show.draft
                show.flag = false
            }
        })
    }

    getArticleList()


    const onSearch = ()=>{
        if(unref(searchValue).length == 0) return warning('请输入搜索内容')
        getArticleList(unref(searchValue))
    }

    const onSearchReset = ()=>{
        searchValue.value = ''
        getArticleList()
    }

    const handleEdit = (scope:Required<ArticleParams>)=>{
        router.push(`/article/manage/${scope._id}`)
    }

    const handleWatch = (scope:Required<ArticleParams>)=>{
        previewText.value = marked(scope.content)
        previewTitle.value = scope.title
        previewDrawerVisiable.value = true
    }
    //preview dialog cancle
    const drawerClosed = ()=>{
        previewDrawerVisiable.value = false
    }

    const handleDelete = (scope:Required<ArticleParams>)=>{
        messageBox('此操作将永久删除该文章, 是否继续?','删除文章',{
            type:'warning',
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            closeOnClickModal:false
        }).then(()=>{
            deleteArticleApi(scope._id).then(res=>{
                if(res.err_code !=200) return error('删除失败！')
                success('删除成功！')
                article.articleList = article.articleList.filter(item=>item._id != scope._id)
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
.m-article{
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
        padding:0px 10px;
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