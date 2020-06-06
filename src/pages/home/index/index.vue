<template>
  <div class="HomeIndex">
    <div class="section top">
      <img class="avatar" :src="userInfo.avatarUrl" alt="">
      <div class="search">
        <div class="label">名称</div>
        <img class="arrow_down" src="/static/resources/home/arrow_down.png" alt="">
      </div>
      <img class="question" src="/static/resources/home/question.png" alt="">
      <img class="scan" src="/static/resources/home/scan.png" alt="">
    </div>
    <div class="section message" :class="{close: !hasMsgNotRead}">
      <div class="long" v-if="hasMsgNotRead">
        <img class="message" src="/static/resources/home/message.png" alt="">
        <div class="flex-1">您有1条未读消息</div>
        <img class="close" src="/static/resources/home/close.png" @click="hasMsgNotRead=false">
      </div>
      <div class="short" v-else>
        <img class="message" src="/static/resources/home/message.png" alt="">
        <div>消息</div>
      </div>
    </div>
    <MapChoose :isTop="!hasMsgNotRead" />
    <div class="section address">
      <div class="address">
        <div class="flex-1">广东省深圳市南山区西丽湖路4065号(西丽湖东</div>
        <img class="daohang" src="/static/resources/home/daohang.png" alt="">
      </div>
      <div class="more_info" :class="{show: showMore}">
        <div class="flex">
          <div class="info_item">
            <div>时间：2020-05-27 23:23:11</div>
            <div>通讯：11</div>
          </div>
          <div>
            <div>信号：信号</div>
            <div>卫星：11</div>
          </div>
          <div class="battery_wrap">
            <div class="battery">电池</div>
            <div class="percent">99%</div>
          </div>
        </div>
        <div class="flex mt-8">
          <div class="info_item">
            <div>速度：4</div>
            <div>经度：114.0412324</div>
            <div>温度：11</div>
          </div>
          <div>
            <div>模式：GPS/BDS</div>
            <div>纬度：11.23453245</div>
            <div>海拔：11</div>
          </div>
        </div>
      </div>
      <div class="more" @click="showMore=!showMore">
        <img class="zhankai" src="/static/resources/home/zhankai.png" alt="">
        <div>{{ showMore ? '收起信息' : '展开更多' }}</div>
      </div>
    </div>
    <div class="section bottom">
      <div class="bottom_item">
        <img class="setting" src="/static/resources/home/setting.png" alt="">
        <div>设置</div>
      </div>
      <div class="pos_wrap">
        <img class="pos" src="/static/resources/home/pos.png" alt="">
      </div>
      <div class="bottom_item">
        <img class="track" src="/static/resources/home/track.png" alt="">
        <div>轨迹</div>
      </div>
    </div>
    <map
      id="map"
      longitude="113.324520"
      latitude="23.099994"
      cale="14"
      :controls="controls"
      bindcontroltap="controltap"
      :markers="markers"
      bindmarkertap="markertap"
      :polyline="polyline"
      bindregionchange="regionchange"
      show-location
      style="width: 100%; height: 100vh;"
    />
  </div>
</template>

<script>
import MapChoose from './comp/MapChoose'

export default {
  components: { MapChoose },
  data: () => ({
    userInfo: {},
    hasMsgNotRead: true,
    showMore: false,
    markers: [{
      iconPath: "/static/resources/home/question.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/static/resources/home/pos.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
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
    regionchange(e) {
      console.log(e.type)
    },
    markertap(e) {
      console.log(e.detail.markerId)
    },
    controltap(e) {
      console.log(e.detail.controlId)
    }
  }
};
</script>

<style lang="less">
.HomeIndex {
  background: rgb(103, 187, 103);
  height: 100vh;
  display: flex;
  justify-content: center;
  .section {
    width: 720rpx;
    position: absolute;
    background: #fff;
    z-index: 1;
    display: flex;
    align-items: center;
    border-radius: 8rpx;
    box-shadow: 0 0 6rpx #ccc;
    &.top {
      height: 7.2vh;
      top: 4.2vh;
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
    }
    &.message {
      top: 12vh;
      color: #999;
      font-size: 24rpx;
      transition: all .3s ease;
      height: 5.2vh;
      overflow: hidden;
      white-space: nowrap;
      &.close {
        left: 17rpx;
        border-radius: 14rpx;
        width: 80rpx;
        height: 100rpx;
      }
      .long {
        display: flex;
        align-items: center;
        width: 100%;
      }
      .short {
        text-align: center;
        padding: 12rpx 16rpx 8rpx;
        img.message {
          margin: 0;
        }
      }
    }
    &.address {
      bottom: 14vh;
      background: rgba(255, 255, 255, .8);
      color: #999;
      padding: 20rpx 36rpx;
      flex-direction: column;
      box-sizing: border-box;
      border-radius: 20rpx;
      &::after {
        content: '';
        position: absolute;
        bottom: -14rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-width: 16rpx 14rpx 0;
        border-style: solid;
        border-color: rgba(255, 255, 255, .9) transparent transparent;
      }
      .address {
        display: flex;
        align-items: center;
        font-size: 28rpx;
      }
      .more_info {
        position: relative;
        margin-top: 12rpx;
        font-size: 24rpx;
        width: 100%;
        height: 0;
        overflow: hidden;
        transition: height .3s ease;
        &.show {
          height: 180rpx;
        }
        .info_item {
          width: 50%;
        }
        .battery_wrap {
          position: absolute;
          right: 10rpx;
          top: 0;
        }
      }
      .more {
        display: flex;
        font-size: 20rpx;
        align-items: center;
        width: 100%;
        margin-top: 12rpx;
      }
    }
    &.bottom {
      width: 468rpx;
      height: 7.8vh;
      bottom: 2vh;
      border-radius: 60rpx;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 70rpx;
      .pos_wrap {
        background: #fff;
        border-radius: 50%;
        width: 132rpx;
        height: 132rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bottom_item {
        font-size: 26rpx;
        color: #666;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .mt {
    &-8 { margin-top: 8rpx; }
  }
  .flex { display: flex; }
  .flex-1 { flex: 1 }
  img {
    &.arrow_down { width: 17rpx; height: 12rpx; }
    &.question { width: 34rpx; height: 34rpx; margin-left: 40rpx; }
    &.scan { width: 32rpx; height: 32rpx; margin-left: 30rpx; margin-right: 26rpx; }
    &.message { width: 29rpx; height: 28rpx; margin-left: 35rpx; margin-right: 32rpx; }
    &.map { width: 29rpx; height: 28rpx; }
    &.close { width: 36rpx; height: 37rpx; margin-right: 20rpx; }
    &.daohang { width: 110rpx; height: 47rpx; margin-left: 30rpx; }
    &.zhankai { width: 18rpx; height: 18rpx; margin-right: 17rpx; }
    &.setting { width: 41rpx; height: 42rpx; }
    &.pos { width: 116rpx; height: 116rpx; }
    &.track { width: 41rpx; height: 39rpx; }
  }
}
</style>
