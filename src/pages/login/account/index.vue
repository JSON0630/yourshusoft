<template>
  <div class="AccountLogin">
    <button @click="login">登录</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['update']),
    login () {
      this.update({token: '123098786'})
      wx.navigateTo({url: '/pages/home/index/main'})
    }
  }
}
</script>

<style lang="less">
.AccountLogin {
  text-align: center;
}
</style>
