<template>
  <div class="device_list">
    <div class="device_fixed">
       <div class="device_tab">
      <span @click="changeTabs(x,key)" v-for="(x,key) in tabsList" :key=key :class="keyIndex == x.value?'device_checked':''">{{x.name}}</span>
    </div>
    <div class="search_box">
      <div class="search">
        <img class="search_img" @click="search" src="/static/resources/setting/search.png"/>
        <input class="search_text" type="text" @confirm="search" v-model="deviceName" placeholder="请输入设备名"/>
        <img class="search_img search_del" @click="cancelText" src="/static/resources/setting/cha.png"/>
      </div> 
    </div>
    </div>
   
    <scroll-view scroll-y class="device_box">
      <div></div>
      <template v-if="list.length>0">
        <!-- <p>{{list.toString()}}</p> -->
        <div class="device_item" v-for="(x,key) in list" :key=key>
         <div class="device_item_top">
          <img class="device_person" :src="x.babyAvatar?x.babyAvatar:'/static/resources/setting/person.png'"/>
          <div>
            <p class="device_status">
              <span class="device_name">{{x.babyName}}</span>
                <span class="offline"> 
                  {{x.online?'在线':'离线'}}
                </span>
              <span class="device_batteray_span"> 
                <img class="device_batteray" src="/static/resources/setting/batteray_0.png"/>
                 <i style="display:inline-block;width:60rpx;text-algin:left;">{{x.electricity }}%</i>
                </span>
            </p>
            <p class="device_ads">{{x.location.address}}</p>
          </div>
        </div>
        <div class="device_item_bottom">
          <p @click="goPosition(x)" >
            <img class="device_dingwei" src="/static/resources/setting/dingwei.png"/>
            定位
          </p>
          <p @click="goTrack(x)">
            <img class="device_guiji" src="/static/resources/setting/guiji.png"/>
              轨迹
          </p>
          <p @click="goSetting(x)">
            <img class="device_set" src="/static/resources/setting/set.png"/>
              设置
          </p>
          <p @click="more(x)"> 
            <img class="device_more" src="/static/resources/setting/more.png"/>
              更多
          </p>
        </div>
      </div>
      </template>
      <p  v-else style="color:#878B8E;font-size:30rpx;margin-top: 289rpx;text-align: center;">暂无数据</p>

    </scroll-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        current: 3,
        keyIndex: '0',
        deviceName:'', 
        page: 1,
        list: [],
        tabsList:[
          {name:'全部',value: 0,checked: true},
          {name:'在线',value: 1,checked: false},
          {name:'离线',value: 2,checked: false}
        ]
      }
    },
    onLoad(){
      this.list = []
      this.getDeviceList({
        type: this.keyIndex,
        size: 10,
        number: this.page,
        keyword: ''
      }) 
    },
    // mounted(){
    //   this.getDeviceList({
    //     type: this.keyIndex,
    //     size: 10,
    //     number: this.page,
    //     keyword: ''
    //   })
    // },
    methods: {
      async getDeviceList(data){
         wx.showToast({
          title: '加载中...',
          icon: 'loading',
          duration: 1000
        })
        let result = await this.$http.deviceList(data)
        if(result && result.data){
          this.list = this.list.concat(result.data.dataList)
        }
        console.log(this.list)
      },
      changeTabs(x,key){
        console.log(x)
        console.log(this.keyIndex) 
        this.keyIndex =x.value
        console.log(x.value == this.keyIndex )
        console.log(this.keyIndex)
      //  this.$set('this.keyIndex',x.value) 
      //  this.keyIndex = x.valvue
        this.page = 1
        this.list = []
        this.getDeviceList({
            type: this.keyIndex,
            size: 10,
            number: this.page,
            keyword: ''
          }
        );
      },
      search(){
        console.log(this.deviceName)
        this.page = 1
        this.list = []
        this.getDeviceList({
            type: this.keyIndex,
            size: 10,
            number: 1,
            keyword: this.deviceName
          }
        );
      },
      cancelText(){
        this.deviceName = ''
        this.page = 1
        this.list = []
        this.getDeviceList({
            type: this.keyIndex,
            size: 10,
            number: 1,
            keyword: this.deviceName
          }
        );
      },
      goPosition(item){
        console.log(item)
        wx.navigateTo({url: `/pages/home/track/main?imei=${item.imei}`})
      },
      goTrack(item){
        console.log(item)
        wx.navigateTo({url: `/pages/home/track/main?imei=${item.imei}`})
      },
      goSetting(item){
        console.log(item)
        wx.navigateTo({url: `/pages/setting/device/setting/main?imei=${item.imei}`})
      },
      more(item){
        console.log(item.imei)
        const that =this
        wx.showActionSheet({
          itemList: ['编辑', '解绑','续费'],
          success (res) {
            console.log(res.tapIndex)
            if(res.tapIndex == 0){
              // that.$store.state.deviceInfo.imei = imei
              wx.navigateTo({url: `/pages/setting/device/edit/main?imei=${item.imei}`})
            }else if(res.tapIndex == 1){
              that.unbindEvent()
            }else if(res.tapIndex == 2){
              // that.$store.update({'imei':item.imei})
              // console.log(item.imei,that.$store.state.deviceInfo.imei)
              wx.navigateTo({url:`/pages/setting/device/renew/main?imei=${item.imei}`})
            }
          },
          fail (res) {
            console.log(res.errMsg)
          }
        })
      },
      unbindEvent(){
         wx.showModal({
          title: '',
          content: '请确认是否解绑？',
          success: (res) => {
            if (res.confirm) {
              console.log('用户点击确定')
                this.unbind();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      async unbind(){
        console.log(11)
        let result = await this.$http.deviceUnBind({'imei':this.imei })
        console.log(result)
        if(result &&result.code == 0){
          wx.showToast({
            title: '解绑设备成功',
            icon: 'success',
            duration: 2000
          })
          that.getDeviceList({
            type: this.keyIndex,
            size: 10,
            number: 1,
            keyword: this.deviceName
          })
        }else{
          wx.showToast({
            title: result.msg,
            icon: 'success',
            duration: 2000
          })
        }
      },
      // onReachBottom(){
      //   console.log(11)
      //   console.log('dibu')
      //   // this.getDeviceList()
      // }
    },
    onReachBottom(){
      console.log(11)
      console.log('dibu')
      this.page++
      //  wx.showToast({
      //   title: '加载中...',
      //   icon: 'loading',
      //   duration: 1000
      // })
      this.getDeviceList({
          type: this.keyIndex,
          size: 10,
          number: this.page,
          keyword: this.deviceName
        }
      );
    }
  };
</script>

<style lang="less" scoped>
.device_list{
  position: relative;
  height: 100%;
  background: #fff;
  .device_fixed{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  .device_tab{
    background: #fff;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    color: #000;
    >span{
      display: inline-block;
      width: 33.3%;
      border-bottom: 1rpx solid #fff;
    }
    .device_checked{
      color: #4388FF;
      border-bottom: 1rpx solid #4388FF;
    }
  }
  .search_box{
    background: #F6F6F6;
    padding: 25rpx 40rpx;
    .search{
      position: relative;
      height: 80rpx;
      line-height: 80rpx;
      padding: 0rpx 20rpx;
      border: 1rpx solid #808080;
      border-radius: 10rpx;
      >.search_text{
        position: absolute;
        left: 60rpx;
        top: 0;
        width: 60%;
        height: 80rpx;
        line-height: 80rpx;
        padding-left: 40rpx;
        padding-right: 60rpx;
        font-size: 25rpx;
        border: none;

      }
      .search_del{
        position: absolute;
        right: 8%;
        z-index: 1;
      }
    }
  }
  .device_box{
    position: absolute;
    top: 0;
    left: 0;
    padding-bottom: 20rpx;
    padding-top: 245rpx;
  }
  .device_item{
    .device_item_top{
      padding: 20rpx 20rpx 20rpx 20rpx; 
      border-bottom: 1rpx solid #F6F6F6;
      div{
        display: inline-block;
        width: 89%;
      }
      .device_status{
        padding: 0rpx 20rpx;
        display: block;
        .device_name{
          color: #000;
        }
        .device_batteray_span,.offline{
          float: right;
        }
        .offline{
          margin-left: 30rpx;
          &::before{
            display: inline-block;
              content: '';
              height: 16rpx;
              width: 16rpx;
              border-radius: 50%;
              background: #878B8E;
          }
        }
      }
      .device_ads{
        padding: 0rpx 20rpx;
      }
    }
    .device_item_bottom{
      padding: 10rpx 20rpx; 
      border-bottom: 1rpx solid #F6F6F6;
      >p{
        width: 25%;
        text-align: center;
      }
    }
    p{
      display: inline-block;
      color: #878B8E;
      font-size: 20rpx;
      >img{
        margin-right: 8rpx;
      }

    }
  }
  
  .search_img,.search_del{
    height: 36rpx;
    width: 36rpx;
    margin-top: 22rpx;
  }
  .device_batteray{
    height: 20rpx;
    width: 35rpx;
    margin-right: 10rpx;
  }
  .device_guiji,.device_set,.device_dingwei{
    height: 35rpx;
    width: 35rpx;
    vertical-align: bottom;
  }
  .device_more{
    height: 12rpx;
    width: 30rpx;
  }
  .device_person{
    height: 75rpx;
    width: 75rpx;
  }
}
</style>
