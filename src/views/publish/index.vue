<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.query.id?'修改文章':'文章发布'}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="publish-form"
             :model="article"
             :rules="formRules"
             label-width="60px">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容"
                    prop="content">
        <!-- <el-input type="textarea"
                  v-model="article.content"></el-input> -->
        <el-tiptap v-model="article.content"
                   lang="zh"
                   :extensions='extensions'></el-tiptap>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="article.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道"
                    prop="channel_id">
        <el-select v-model="article.channel_id"
                   placeholder="请选择活动区域">
          <el-option :label="channel.name"
                     v-for="channel in channels"
                     :key="channel.id"
                     :value="channel.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="onPublish(false)">发布</el-button>
        <el-button @click="onPublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  getArticleChannels, addArticle,
  updateArticle,
  getArticle
} from '@/api/article'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import { uploadImage } from '@/api/image'
export default {
  name: 'Publish',
  props: {},
  components: {
    'el-tiptap': ElementTiptap
  },
  data () {
    return {
      channels: [],
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null

      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              console.log(res)
              return res.data.data.url
            })
          }
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
        new TextColor()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
          {
            validator (rule, value, callback) {
              console.log('content validator')
              if (value === '<p></p>') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            }
          }
        ],
        channel_id: [
          { required: true, message: '请选择频道' }

        ]
      }
    }
  },

  computed: {},

  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },

  mounted () { },

  methods: {
    onPublish (draft = false) {
      // 提交前要进行验证
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return
        }
        const articleId = this.$route.query.id
        if (articleId) {
          updateArticle(articleId, this.article, draft).then(res => {
            this.$message({
              message: `${draft ? '存入草稿' : '修改'}成功`,
              type: 'success'
            })
          })
        } else {
          addArticle(this.article, draft).then(res => {
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            this.$router.push('/article')
          })
        }
      })
    },
    async loadChannels () {
      const { data } = await getArticleChannels()
      this.channels = data.data.channels
    },
    async loadArticle () {
      const res = await getArticle(this.$route.query.id)
      this.article = res.data.data
      // updateArticle()
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
</style>
