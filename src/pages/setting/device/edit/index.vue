<template>
  <div class="device_edit">
    <div class="device_img_box">
        <p class="jiebang">解绑</p>
        <img class="person_img" src="/static/resources/setting/person.png" />
        <div class="img_box">
            <div class="img_text">
              <p>2020-04-01</p>
              <p>到期</p>
            </div>
            <div class="img_text">
              <p>10</p>
              <p>短信剩余</p>
            </div>
        </div>
    </div>
    <div class="edit_box">
        <p class="edit_p">
          <span>IMEI</span>
          <span>454546884373495745345</span>
        </p>
        <p class="edit_p">
          <span>名称</span>
          <span>佛山市顺德区</span>
        </p>
        <p class="edit_p">
          <span>ICCID</span>
          <span>45454688437349574534578979790</span>
        </p>
    </div>
    <div class="btn_box">
      <button type="" :disabled="disabled" :loading=loading hover-class=“button-hover”>重启设备</button>
    </div>
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="less" scoped>
.device_edit{
  position: absolute;
  background: #F6F6F6;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .device_img_box{
    position: relative;
    background: #4388FF;
    height: 36vh;
    padding-top: 100rpx;
    text-align: center;
    color: #fff;
    width: 100%;
    font-size: 24rpx;
    .jiebang{
      position: absolute;
      top: 0;
      right: 0;
      width: 100rpx;
      height: 90rpx;
      line-height: 90rpx;
    }
    .img_box{
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    .img_text{
      display: inline-block;
      width: 50%;
      padding: 0 40rpx 20rpx 40rpx;
      &:nth-child(1){
        text-align: left;
        padding-right: 40rpx;
      }
      &:nth-child(2){
        text-align: right;
        padding-right: 40rpx;
      }
    }
  }
  .edit_box{
    background: #fff;
    font-size: 24rpx;
    .edit_p{
      padding: 0 20rpx;
      height: 90rpx;
      line-height: 90rpx; 
      border-bottom: 1rpx solid #F6F6F6;
      >span{
        &:nth-child(1){
          display: inline-block;
          width: 100rpx;
        }
      }
    }
  }
  .btn_box{
    position: absolute;
    left: 0;
    bottom: 60rpx;
    width: 100%;
    font-size: 30rpx;
    // background: #F6F6F6;
    >button{
      background:#4388FF;
      width: 90%;
      height: 80rpx;
      line-height: 80rpx;
      color: #fff;
      border: none;
      border-radius: 10rpx;
    }
  }
  .person_img{
    height: 160rpx;
    width: 160rpx;
  }
}
</style>
