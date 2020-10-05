<template>
  <div class='container'>
    <el-card class="filter-card">
      <div slot="header"
           class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form"
               :model="form"
               size="mini"
               label-width="40px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId"
                     placeholder="请选择频道">
            <el-option label="全部"
                       :value="null" />
            <el-option :label="channel.name"
                       v-for="channel in channels"
                       :key="channel.id"
                       :value="channel.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker v-model="rangeDate"
                          type="daterange"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['00:00:00', '23:59:59']"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     :disabled='loading'
                     @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        根据筛选条件共查询到{{totalCount}}条结果
      </div>

      <!-- 数据列表 -->
      <el-table :data="articles"
                stripe
                border
                size='mini'
                class="list-table"
                style="width: 100%"
                v-loading="loading">
        <el-table-column prop="date"
                         label="封面">
          <template slot-scope='scope'>
            <el-image :src="scope.row.cover.images[0]"
                      style="width:100px;height:100px"
                      fit="cover"
                      lazy>
              <div slot="placeholder"
                   class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <!-- <img class='article-cover'
                 v-if="scope.row.cover.images[0]"
                 :src="scope.row.cover.images[0]">
            <img class='article-cover'
                 v-else
                 src="./no-cover.jpg"> -->
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="标题">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope='scope'>
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
            <!--  <el-tag v-if="scope.row.status===0"
                    type="warning">草稿</el-tag>
             <el-tag v-else-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status===2"
                    type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status===3"
                    type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status===4"
                    type="info">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="pubdate"
                         label="发布时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="primary"
                       circle
                       icon='el-icon-edit'
                       @click="$router.push(`/publish?id=${scope.row.id}`)"></el-button>
            <el-button size="mini"
                       type="danger"
                       circle
                       icon='el-icon-delete'
                       @click='onDeleteArticle(scope.row.id)'></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表分页 -->
      <el-pagination layout="prev, pager, next"
                     background
                     :total="totalCount"
                     :page-size="pageSize"
                     :disabled='loading'
                     :current-page.sync="page"
                     @current-change='onCurrentChange'>
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'
export default {
  name: 'Article',
  props: {},
  components: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: 'primary' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0,
      pageSize: 10,
      status: null,
      channels: [],
      channelId: null,
      rangeDate: [],
      loading: true,
      page: 1
    }
  },
  computed: {},

  created () {
    this.loadChannels()
    this.loadArticles()
  },

  mounted () {

  },

  methods: {
    onSubmit () {
      console.log('submit!')
    },
    async loadArticles (page = 1) {
      this.loading = true
      try {
        const { data } = await getArticles(
          {
            page,
            per_page: this.pageSize,
            status: this.status,
            channel_id: this.channelId,
            begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
            end_pubdate: this.rangeDate ? this.rangeDate[1] : null
          })
        const { results, total_count: totalCount } = data.data
        this.articles = results
        this.totalCount = totalCount
        this.loading = false
      } catch (error) {

      }
    },
    onCurrentChange (page) {
      console.log(page)
      this.loadArticles(page)
    },
    async loadChannels () {
      try {
        const res = await getArticleChannels()
        this.channels = res.data.data.channels
        console.log(res)
        console.log(this.channels)
      } catch (error) {

      }
    },
    async onDeleteArticle (articleId) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          this.loadArticles(this.page)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.filter-card {
  margin-bottom: 5px;
}
.list-table {
  margin-bottom: 20px;
}
.article-cover {
  width: 60px;
  background-size: cover;
}
</style>
