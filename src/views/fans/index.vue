<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </el-card>
</template>

<script>

export default {
  name: 'fans',
  props: {},
  components: {},
  data () {
    return {

    }
  },

  computed: {},

  created () { },

  mounted () { },

  methods: {},

  watch: {}

}

</script>
<style lang='less' scoped>
</style>
