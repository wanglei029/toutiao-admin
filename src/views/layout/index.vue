<template>
  <div class='container'>
    <el-container class="layou-container">
      <el-aside width="200px">
        <app-aside class="aside-menu"></app-aside>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            <i class="el-icon-s-fold"></i>
            <span>头条后台文章管理系统</span>
          </div>
          <el-dropdown>
            <div class="avatar-wrap el-dropdown-link">
              <img :src="user.photo"
                   class="avatar">
              <span>{{user.name}}</span><i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <!-- <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span> -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- 子路由出口 -->

  </div>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  props: {},
  components: {
    AppAside
  },
  data () {
    return {
      user: {}
    }
  },

  computed: {},

  created () {
    this.loadUserProfile()
  },

  mounted () { },

  methods: {
    async loadUserProfile () {
      try {
        const res = await getUserProfile()
        this.user = res.data.data
      } catch (error) {

      }
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
.layou-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .el-aside {
    background: #d3dce6;
    .aside-menu {
      height: 100%;
    }
  }
  .el-header {
    // background: #b3c0d1;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-main {
    background: #e9eef3;
  }
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
