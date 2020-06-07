<template>
  <div class="Message" :class="{close: !hasNewMsg}">
    <div class="long" v-if="hasNewMsg">
      <img class="message" src="/static/resources/home/message.png" alt="">
      <div class="flex-1">您有1条未读消息</div>
      <img class="close" src="/static/resources/home/close.png" @click="$emit('close')">
    </div>
    <div class="short" v-else>
      <img class="message" src="/static/resources/home/message.png" alt="">
      <div>消息</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasNewMsg: Boolean
  }
}
</script>

<style lang="less">
.Message {
  width: 720rpx;
  height: 5.2vh;
  position: absolute;
  top: 12vh;
  z-index: 1;
  background: #fff;
  display: flex;
  align-items: center;
  border-radius: 8rpx;
  box-shadow: 0 0 6rpx #ccc;
  color: #999;
  font-size: 24rpx;
  transition: all .3s ease;
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
  img {
    &.message { width: 29rpx; height: 28rpx; margin-left: 35rpx; margin-right: 32rpx; }
    &.close { width: 36rpx; height: 37rpx; margin-right: 20rpx; }
  }
}
</style>
