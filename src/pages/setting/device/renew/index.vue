<template>
  <div class="device_renew"> 
     <!-- <i-tabs class="device_tab"  current="0" color="#f759ab" bindchange="handleChange">
      <i-tab key="tab1" title="设备续费"></i-tab>
      <i-tab key="tab2" title="短信充值"></i-tab>
    </i-tabs> -->
      <div class="device_tab">
          <span v-for="(x,key) in renewList" :key=<i class="el el-return-key"></i> :class="key == 1?'device_checked':''">{{x}}</span>
      </div>
    <div class="device_info">
      <div>
        <p>猫（2051-06-25到期）</p>
        <p>IMEI:363620181216205</p>
      </div>
      <div class="person_box">
        <img class="person_img" src="/static/resources/setting/person.png"/>
         <!-- <img class="arr_right" src="/static/resources/arr_right.png"/> -->
      </div>
    </div>
    <div class="device_chongzhi">
      <p class="chongzhi_text">充值</p>
      <div class="chongzhi_price">
        <span>
          <p>200M</p>
          <p>8元</p>
        </span>
         <span class="chongzhi_price_checked">
          <p>200M</p>
          <p>8元</p>
        </span>
         <span>
          <p>200M</p>
          <p>8元</p>
        </span>
         <span>
          <p>200M</p>
          <p>8元</p>
        </span>
      </div>
    </div>
    <div class="device_wechat">
       <img class="wechat_img" src="/static/resources/setting/wechat.png"/>
       <span>微信支付</span>
      <label class="checkbox device_radio">
        <checkbox class="" value="cb" checked="true"/>
      </label>
    </div>
    <div class="btn_box">
      <button type="" :disabled="disabled" :loading=loading hover-class=“button-hover”>确认支付</button>
    </div>
  </div>
</template>

<script>
  export default {
     data () {
          return {
            renewList: ['设备续费','短信充值'],
            current: 3,
            animal: '微信',
            disabled: false,
            loading: false
          }
      },
    methods: {
      handleChange(){

      },
      handleAnimalChange(){

      }
    }
  };
</script>

<style lang="less" scoped>
.device_renew{
  position: absolute;
  top: 0;
  left: 0;
  background: #F6F6F6;
  height: 100%;
  width: 100%;
  .device_tab{
    background: #fff;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    color: #000;
    >span{
      display: inline-block;
      width: 50%;
      border-bottom: 1rpx solid #fff;
    }
    .device_checked{
      color: #4388FF;
      border-bottom: 1rpx solid #4388FF;
    }
  }
  .device_info{
    position: relative;
    background: #fff;
    padding: 40rpx;
    color: #000;
    font-size: 24rpx;
    margin-top: 30rpx;
    >.person_box{
      position: absolute;
      top: 36rpx;
      right: 40rpx;
    }
    p{
      &:nth-child(1){
        margin-top: 10rpx;
      }
    }
  }
  .device_chongzhi{
    background: #fff;
    padding: 40rpx;
    font-size: 24rpx;
    .chongzhi_text{
      margin-bottom: 60rpx;
    }
    .chongzhi_price{
      >span{
        display: inline-block;
        width: 22%;
        height: 100rpx;
        padding: 10rpx 0;
        line-height: 48rpx;
        border: 1rpx solid #4388FF;
        border-radius: 10rpx;
        text-align: center;
        margin-right: 18rpx;
        color: #4388FF;
      }
      .chongzhi_price_checked{
        background: #4388FF;
        color: #fff;  
      }
    } 
  }
  .device_wechat{
    background: #fff;
    margin-top: 30rpx;
    height: 90rpx;
    line-height: 90rpx;
    padding: 20rpx 40rpx;
    font-size: 24rpx;
    >span{
      display: inline-block;
      height: 90rpx;
      line-height: 90rpx;
      vertical-align: top;
    }
    .device_radio{
      float: right;
    }
    .wechat_img{
       margin-top: 7rpx;
       margin-right: 30rpx;
    }
  }
  .btn_box{
    margin-top: 40rpx;
    >button{
      background: #4388FF;
      width: 80%;
      color: #fff;
      border: none;
      border-radius: 10rpx;
    }
  }
  .person_img{
    height: 76rpx;
    width: 76rpx;
    margin-right: 30rpx;
  }
  .arr_right{
    height: 35rpx;
    width: 18rpx;
    vertical-align: top;
    margin-top: 25rpx;
  }
  .wechat_img{
    height: 75rpx;
    width: 75rpx;
  }
}
</style>
