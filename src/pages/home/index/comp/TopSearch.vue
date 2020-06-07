<template>
  <div class="TopSearch">
    <img class="avatar" :src="userInfo.avatarUrl" @click="goSetting">
    <div class="search">
      <div class="label">名称</div>
      <img class="arrow_down" src="/static/resources/home/arrow_down.png" alt="">
    </div>
    <img class="question" src="/static/resources/home/question.png" alt="">
    <img class="scan" src="/static/resources/home/scan.png" alt="">
  </div>
</template>

<script>
export default {
  data: () => ({
    userInfo: {}
  }),
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                this.userInfo = res.userInfo
              }
            })
          }
        }
      })
    },
    goSetting () {
      wx.navigateTo({url: '/pages/setting/index/main'})
    }
  }
}
</script>

<style lang="less">
.TopSearch {
  width: 720rpx;
  height: 7.2vh;
  position: absolute;
  top: 4.2vh;
  z-index: 1;
  background: #fff;
  display: flex;
  align-items: center;
  border-radius: 8rpx;
  box-shadow: 0 0 6rpx #ccc;
  .avatar {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    margin-left: 20rpx;
  }
  .search {
    margin-left: 30rpx;
    display: flex;
    align-items: center;
    flex: 1;
    color: #666;
    justify-content: space-between;
    input {
      padding-left: 6rpx;
      flex: 1;
    }
  }
  img {
    &.arrow_down { width: 17rpx; height: 12rpx; }
    &.question { width: 34rpx; height: 34rpx; margin-left: 40rpx; }
    &.scan { width: 32rpx; height: 32rpx; margin-left: 30rpx; margin-right: 26rpx; }
  }
}
</style>
