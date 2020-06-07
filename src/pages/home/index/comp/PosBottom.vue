<template>
  <div class="PosBottom">
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
</template>

<script>
export default {
  
}
</script>

<style lang="less">
.PosBottom {
  width: 468rpx;
  height: 7.8vh;
  position: absolute;
  bottom: 2vh;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 0 6rpx #ccc;
  border-radius: 60rpx;
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
  img {
    &.setting { width: 41rpx; height: 42rpx; }
    &.pos { width: 116rpx; height: 116rpx; }
    &.track { width: 41rpx; height: 39rpx; }
  }
}
</style>
