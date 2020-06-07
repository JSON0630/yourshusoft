<template>
  <block>
    <div class="TopSearch" v-if="!showSelect">
      <navigator url="/pages/setting/index/main">
        <img class="avatar" :src="userInfo.avatarUrl" />
      </navigator>
      <div class="search" @click="showSelect=true">
        <div class="label">名称</div>
        <img class="arrow_down" src="/static/resources/home/arrow_down.png" alt="">
      </div>
      <img class="question" src="/static/resources/home/question.png" alt="">
      <img class="scan" src="/static/resources/home/scan.png" alt="">
    </div>
    <div class="TopSearch" v-else>
      <input class="flex-1" type="text" placeholder="请输入设备名称或imei号">
      <div class="cancel" @click="showSelect=false">取消</div>
    </div>
    <div class="DeviceList" :class="{open: showSelect}">
      <div class="item" v-for="(x, i) in deviceList" :key="i">
        <div class="left"></div>
        <div class="right"></div>
      </div>
    </div>
  </block>
</template>

<script>
export default {
  data: () => ({
    userInfo: {},
    showSelect: false,
    deviceList: []
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
  padding: 0 20rpx;
  .avatar {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
  }
  .search {
    margin-left: 30rpx;
    display: flex;
    align-items: center;
    flex: 1;
    color: #666;
    justify-content: space-between;
  }
  input::placeholder {
    color: #999;
    font-size: 28rpx;
  }
  .cancel {
    color: #666;
    font-size: 28rpx;
  }
  img {
    &.arrow_down { width: 17rpx; height: 12rpx; }
    &.question { width: 34rpx; height: 34rpx; margin-left: 40rpx; }
    &.scan { width: 32rpx; height: 32rpx; margin-left: 30rpx; }
  }
}
.DeviceList {
  position: fixed;
  top: 12vh;
  z-index: 3;
  width: 720rpx;
  height: 0;
  overflow-y: auto;
  background: #fff;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8rpx;
  box-shadow: 0 0 6rpx #ccc;
  transition: height .3s ease;
  &.open {
    height: 87vh;
  }
}
</style>
