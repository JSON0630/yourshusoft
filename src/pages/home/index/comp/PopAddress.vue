<template>
  <div class="PopAddress">
    <div class="location" @click="$emit('onPos')">
      <img class="img_location" src="/static/resources/home/location.png" alt="">
    </div>
    <div class="address">
      <div class="flex-1">广东省深圳市南山区西丽湖路4065号(西丽湖东</div>
      <img class="img_daohang" src="/static/resources/home/daohang.png" @click="$emit('daohang')">
    </div>
    <div class="more_info" :class="{show: showMore}">
      <div class="flex">
        <div class="info_item">
          <div>时间：{{ detail.createTime }}</div>
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
      <img class="img_zhankai" src="/static/resources/home/zhankai.png" alt="">
      <div>{{ showMore ? '收起信息' : '展开更多' }}</div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils'

export default {
  props: {
    device: Object
  },
  data: () => ({
    showMore: false
  }),
  computed: {
    detail() {
      return {
        ...this.device, 
        createTime: formatTime(this.device.createTime, 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
}
</script>

<style lang="less">
.PopAddress {
  width: 720rpx;
  position: absolute;
  bottom: 14vh;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 6rpx #ccc;
  background: rgba(255, 255, 255, .8);
  color: #999;
  padding: 20rpx 36rpx;
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
  .location {
    position: absolute;
    right: 0;
    top: -100rpx;
    width: 85rpx;
    height: 84rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 6rpx #ccc;
    border-radius: 50%;
    background: #fff;
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
  .img {
    &_daohang { width: 110rpx; height: 47rpx; margin-left: 30rpx; }
    &_zhankai { width: 18rpx; height: 18rpx; margin-right: 17rpx; }
    &_location { width: 46rpx; height: 45rpx; }
  }
}
</style>
