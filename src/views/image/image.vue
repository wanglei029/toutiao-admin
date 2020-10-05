<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="padding-bottom:20px;">
      <el-radio-group v-model="radio1"
                      size="mini">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
    </div>
    <!-- 素材列表 -->
    <el-row :gutter="10">
      <el-col :lg='4'
              :xs="12"
              :sm="6"
              :md="6">
        <el-image style="height: 100px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"></el-image>
      </el-col>
      <el-col :lg='4'
              :xs="12"
              :sm="6"
              :md="6">
        <el-image style="height: 100px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"></el-image>
      </el-col>
      <el-col :lg='4'
              :xs="12"
              :sm="6"
              :md="6">
        <el-image style="height: 100px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"></el-image>
      </el-col>
      <el-col :lg='4'
              :xs="12"
              :sm="6"
              :md="6">
        <el-image style="height: 100px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"></el-image>
      </el-col>
      <el-col :lg='4'
              :xs="12"
              :sm="6"
              :md="6">
        <el-image style="height: 100px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"></el-image>
      </el-col>
      <el-col :lg='4'
              :xs="12"
              :sm="6"
              :md="6">
        <el-image style="height: 100px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"></el-image>
      </el-col>
      <el-col :lg='4'
              :xs="12"
              :sm="6"
              :md="6">
        <el-image style="height: 100px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"></el-image>
      </el-col>
      <el-col :lg='4'
              :xs="12"
              :sm="6"
              :md="6">
        <el-image style="height: 100px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"></el-image>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: 'ImageIndex',
  props: {},
  components: {},
  data () {
    return {
      radio1: '全部'
    }
  },

  computed: {},

  created () {
  },

  mounted () { },

  methods: {},

  watch: {}

}

</script>
<style lang='less' scoped>
</style>
