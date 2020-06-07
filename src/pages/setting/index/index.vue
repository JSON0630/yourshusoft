<template>
   <div class="person_center">
    <div class="person_img">
      <img  class="person" src="/static/resources/person.png"/>
      <div class="account" >体验账号</div>
      <div class="current_shebei">当前设备<span>佛山市顺德区</span></div>
    </div>
    <div class="setting_item">
      <span><img class="shebei"  src="/static/resources/setting/shebei.png"/></span>
      <div class="device_text">设备管理</div>
      <img class="arr_right"  src="/static/resources/arr_right.png"/>
    </div>
   <div class="setting_item">
      <span><img class="banben_img"  src="/static/resources/setting/banben.png"/></span>
     <div class="device_text">当前版本</div>
     <img class="arr_right"  src="/static/resources/arr_right.png"/>
     <span class="banben">0.0.0</span>
    </div>
     <div class="btn_box exit_btn">
      <button type="" :disabled="disabled" :loading=loading hover-class=“button-hover”>退出登录</button>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
  .person_center{
    color: #000000;
    .person_img,.setting_item{
      padding: 25rpx 40rpx;
      .account{
        margin-top: 20rpx;
      }
      .arr_right{
        margin-right: 0;
      }
    }
    .person_img{
      height: 13.79vh;
      padding-top: 25rpx;
      >.person{
        border-radius: 50%;
        float: left;
        height:120rpx;
        width: 120rpx;
        margin-right:32rpx;
        vertical-align:middle;
      }
      .current_shebei{
        font-size: 20rpx;
        margin-top: 5rpx;
        >span{
          margin-left: 10rpx;
          color: #E64340;
        }
      }
    }
    .setting_item{
      height: 90rpx;
      line-height: 90rpx;
      border-bottom: 1rpx solid  #F6F6F6;
      .device_text{
        display: inline-block;
        height: 90rpx;
        vertical-align: top;
        margin-left: 28rpx;
      }
      span{
        display: inline-block;
        width: 50rpx;
        text-align: center;
      }
      .arr_right{
        float: right;
        margin-top: 26rpx;
      }
      .banben{
        float:right;
        margin-right: 20px;
      }
    }
    .exit_btn{
      position:fixed;
      bottom:0px;
      left:0;
      text-align:center;
      position: fixed;
      width: 100%;
      padding-bottom: 60rpx;
      >button{
        display:inline-block;
        background: #E64340;
        color:#FEFEFE;
        width:86%;
        height: 98rpx;
        line-height: 98rpx;
        padding:0;
        margin:0;
        border: none;
        border-radius: 10rpx;
      }


    }
     .shebei{
       margin-top: 20rpx;
        height: 50rpx;
        width: 30rpx;
      }
    .arr_right{
      height: 35rpx;
      width: 18rpx;
    }
    .banben_img{
      height: 40rpx;
      width: 40rpx;
      margin-top: 20rpx;
    }
  }

</style>