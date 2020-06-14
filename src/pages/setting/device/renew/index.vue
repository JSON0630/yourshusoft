<template>
  <div class="device_renew">
    <div class="device_tab">
      <span @click="changeType(x)" v-for="(x,key) in renewList" :key=key :class="type == x.type?'device_checked':''">{{x.name}}</span>
    </div>
    <div class="device_info">
      <div>
        <p>{{info.babyName}}（{{info.effectiveTimeStr}}到期）</p>
        <p>IMEI:{{info.imei}}</p>
      </div>
      <div class="person_box">
        <img class="person_img" 
        :src="info.babyAvatar?info.babyAvatar:'/static/resources/setting/person.png'"/>
        <!-- <img class="arr_right" src="/static/resources/arr_right.png"/> -->
      </div>
    </div>
    <div class="device_chongzhi">
      <p class="chongzhi_text">充值</p>
      <div class="chongzhi_price">
        <span v-for="(x,key) in list1" :key=key @click="checkPrice(x)" :class="x.id== id?'chongzhi_price_checked':''">
          <p>{{x.name}}</p>
          <p>{{x.priceName}}</p>
        </span>
        <!-- <span class="chongzhi_price_checked">
          <p>200M</p>
          <p>8元</p>
        </span> -->
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
      renewList: [{name:'设备续费',type:1},{name:'短信充值',type:2}],
      list:[],
      list1:[],
      type: 1,
      id: '',
      imei:'',
      info: {},
      animal: '微信',
      disabled: false,
      loading: false
    }
  },
  mounted(){
    console.log(this.$store.state.deviceInfo.imei)
    this.getPayList();
    this.getDeviceInfo();
  },
  onLoad (options) {
    this.imei = options.imei
  },
  methods: {
    async getDeviceInfo(){
      let result = await this.$http.deviceGet({'imei':this.imei })
      if(result && result.data){
        this.info = result.data
      }
    },
    async getPayList(){
      let result = await this.$http.payRechargeList()
      if(result && result.data){
        this.list = result.data;
        this.list1 = this.list.filter((item)=>{
          return item.type == this.type
        })
        this.id = this.list1[0].id
        console.log(this.list,this.list1)
      }
    },
    changeType(x){
      this.type = x.type
      this.list1 = this.list.filter((item)=>{
        return item.type == this.type
      })
      this.id = this.list1[0].id
    },
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
      height: 130rpx;
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
          margin-bottom: 10rpx;
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
