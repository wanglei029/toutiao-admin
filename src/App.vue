<template>
  <div id="app">
    <login></login>
    <router-view />
  </div>
</template>
<script>
import Login from '@/views/login'

export default {
  components: {
    Login
  }
}
</script>
<style lang="less">
</style>
