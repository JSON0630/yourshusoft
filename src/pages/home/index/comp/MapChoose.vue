<template>
  <div class="MapChoose" :class="{isTop}">
    <img class="map" src="/static/resources/home/map.png" alt="">
    <div>地图</div>
    <Drawer>
      <div>helo</div>
    </Drawer>
  </div>
</template>

<script>
import Drawer from '@/components/Drawer'
export default {
  components: { Drawer },
  props: {
    isTop: Boolean
  }
}
</script>

<style lang="less">
.MapChoose {
  position: absolute;
  top: 18vh;
  right: 17rpx;
  border-radius: 14rpx;
  width: 80rpx;
  height: 100rpx;
  background: #fff;
  z-index: 2;
  color: #999;
  font-size: 24rpx;
  text-align: center;
  padding: 12rpx 16rpx 8rpx;
  box-sizing: border-box;
  transition: top .3s ease;
  &.isTop { top: 12vh; }
}
</style>
