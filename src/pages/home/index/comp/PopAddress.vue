<template>
  <div class="PopAddress">
    <div class="location" @click="$emit('onPos')">
      <img class="img_location" src="/static/resources/home/location.png" alt="">
    </div>
    <div class="address">
      <div class="flex-1" @click="showMore=!showMore">{{ recordLast.address }}</div>
      <img class="img_daohang" src="/static/resources/home/daohang.png" @click="$emit('daohang')">
    </div>
    <div class="more_info" :class="{show: showMore}" @click="showMore=!showMore">
      <div class="flex">
        <div class="info_item">
          <div>时间：{{ recordLast.date }}</div>
          <div>通讯：{{ recordLast.activityTime }}</div>
        </div>
        <div>
          <div>信号：{{ recordLast.signal }}</div>
          <div>卫星：{{ recordLast.satellite}}</div>
        </div>
        <div class="battery_wrap">
          <div class="battery">电池</div>
          <div class="percent">{{ recordLast.electricity }}%</div>
        </div>
      </div>
      <div class="flex mt-8">
        <div class="info_item">
          <div>速度：{{ recordLast.speed }}</div>
          <div>经度：{{ recordLast.lng }}</div>
          <div>温度：{{ recordLast.temperature || '无' }}</div>
        </div>
        <div>
          <div>模式：{{ recordLast.type }}</div>
          <div>纬度：{{ recordLast.lat }}</div>
          <div>海拔：{{ recordLast.altitude }}</div>
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
    recordLast: Object
  },
  data: () => ({
    showMore: false
  })
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
    justify-content: space-between;
    font-size: 28rpx;
    width: 100%;
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
