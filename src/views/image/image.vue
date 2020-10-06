<template>
  <div>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/image' }">素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect"
                        size="mini"
                        @change="loadImages(1)">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="mini"
                   type="success"
                   @click="dialogUploadVisible=true">上传素材</el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col :lg='4'
                :xs="12"
                :sm="6"
                :md="6"
                v-for="image of images"
                :key="image.id"
                class="image-item">
          <el-image style="height: 100px"
                    :src="image.url"
                    fit="cover"></el-image>
          <div class="image-action">
            <el-button type="warning"
                       :icon="image.is_collected?'el-icon-star-on':'el-icon-star-off'"
                       circle
                       size="mini"
                       :loading="image.loading"
                       @click="onCollect(image)"></el-button>
            <el-button type="danger"
                       icon="el-icon-delete-solid"
                       circle
                       size="mini"
                       :loading="image.loading"
                       @click="onDelete(image)"></el-button>
            <!-- <i :class="{'el-icon-star-on':image.is_collected,'el-icon-star-off':!image.is_collected}"
               @click="onCollect(image)"></i> -->
            <!-- <i class="el-icon-delete-solid"></i> -->
          </div>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total_count"
                     :page-size="pageSize"
                     :current-page.sync="page"
                     @current-change="onPageChange">
      </el-pagination>
    </el-card>
    <el-dialog title="上传素材"
               :visible.sync='dialogUploadVisible'
               :append-to-body="true">
      <el-upload :show-file-list="false"
                 class="upload-demo"
                 drag
                 :headers="uploadHeaders"
                 name="image"
                 action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                 multiple
                 :on-success="onUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip"
             slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>

  </div>
</template>

<script>
import { getImages, collectImages, deleteImage } from '@/api/image'
export default {
  name: 'ImageIndex',
  props: {},
  components: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      total_count: 0,
      pageSize: 12, // 每页大小
      page: 1
    }
  },

  computed: {},

  created () {
    /* 页面初始化加载第一页数据 */
    this.loadImages(1)
  },

  mounted () {

  },

  methods: {
    async loadImages (page = 1) {
      console.log('加载图片')
      this.page = page
      const res = await getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      })
      const results = res.data.data.results
      results.forEach(img => {
        img.loading = false
      })
      this.images = results
      this.total_count = res.data.data.total_count
    },
    onCollectChange () {
      this.loadImages(this.page)
    },
    onUploadSuccess () {
      /* 关闭对话框 */
      this.dialogUploadVisible = false
      /* 更新素材列表 */
      this.loadImages(this.page)
    },
    onPageChange () {
      this.loadImages(this.page)
    },
    onCollect (image) {
      // 已收藏 就取消收藏
      console.log(image)
      image.loading = true
      collectImages(image.id, !image.is_collected).then(res => {
        // console.log(res)
        image.is_collected = !image.is_collected
        image.loading = false
      })
      // 未收藏 添加收藏
    },
    onDelete (image) {
      image.loading = true
      deleteImage(image.id).then(
        res => {
          // console.log(res)
          this.loadImages(this.page)
          image.loading = false
        }
      )
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-item {
  position: relative;
}
.image-action {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 25px;
  color: #fff;
  height: 30px;
  background-color: rgba(204, 204, 204, 0.5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}
</style>
