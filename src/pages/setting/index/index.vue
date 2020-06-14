<template>
  <div class="person_center">
    <div class="person_img" @click="goDeviceInfo">
      <!-- <img  class="person" src="/static/resources/setting/person.png"/> -->
      <img class="person" :src="deviceInfo.babyAvatar?deviceInfo.babyAvatar:'/static/resources/setting/person.png'" />
      <div class="account" >{{deviceInfo.babyName}}</div>
      <div class="current_shebei">当前设备<span>{{deviceInfo.area? deviceInfo.area:'--'}}</span></div>
    </div>
    <div class="setting_item" @click="onDeviceList">
      <span><img class="shebei"  src="/static/resources/setting/shebei.png"/></span>
      <div class="device_text">设备管理</div>
      <img class="arr_right"  src="/static/resources/arr_right.png"/>
    </div>
    <div class="setting_item" @click="onChangeEdition">
      <span><img class="banben_img"  src="/static/resources/setting/banben.png"/></span>
      <div class="device_text">当前版本</div>
      <img class="arr_right"  src="/static/resources/arr_right.png"/>
      <span class="banben">0.0.0</span>
    </div>
    <div class="btn_box exit_btn" @click="exit">
      <button type="" :disabled="disabled" :loading=disabled hover-class=“button-hover”>退出登录</button>
    </div>
  </div>
</template>

<script>
    export default {
        data: () => ({
            // keys: {
            //   loginName: '12345678901',
            //   password: '1234'
            // }
            'imei': '353520171025838',
            deviceInfo: {},
            disabled: false
        }),
        mounted(){
            this.getDeviceInfo();
        },
        methods: {
            async getDeviceInfo(){
                let result = await this.$http.deviceGet({'imei':this.imei })
                if(result && result.data){
                    this.deviceInfo = result.data;
                }
            },
            //  async getPersonData(){
            //     const { loginName, password } = this.keys
            //     let result = await this.$http.userPushTokenUpdate({loginName, password})
            //     console.log(result)
            //   },
            onDeviceList(){
                wx.navigateTo({url: '/pages/setting/device/manage/main'})
            },
            onChangeEdition(){
                wx.navigateTo({url: '/pages/setting/edition/main'})
            },
            goDeviceInfo(){
                wx.navigateTo({url: '/pages/setting/device/edit/main'})
            },
            exit(){
                wx.showModal({
                    title: '',
                    content: '请确认是否退出登录？',
                    success : (res) =>  {
                        if(res.confirm) {
                            console.log('用户点击确定')
                            this.logOut()
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            },
            async logOut(){
                this.disabled =true
                let result = await this.$http.userLogout()
                console.log(result)
                if(result.code == 0){
                    this.disabled = false
                    wx.navigateTo({url: '/pages/login/phone/index/main'})
                }else{
                    setTimeout(function(){
                        this.disabled = false
                    },1000)
                }
            }
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
      height: 120rpx;
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
