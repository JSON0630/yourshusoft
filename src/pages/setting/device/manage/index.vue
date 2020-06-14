<template>
  <div class="device_list">
    <div class="device_fixed">
       <div class="device_tab">
      <span @click="changeTabs(x,key)" v-for="(x,key) in tabsList" :key=key :class="keyIndex == key?'device_checked':''">{{x.name}}</span>
    </div>
    <div class="search_box">
      <div class="search">
        <img class="search_img" @click="search" src="/static/resources/setting/search.png"/>
        <input class="search_text" type="text" @confirm="search" v-model="deviceName" placeholder="请输入设备名"/>
        <img class="search_img search_del" @click="cancelText" src="/static/resources/setting/cha.png"/>
      </div> 
    </div>
    </div>
   
    <scroll-view scroll-y class="device_box" v-if="list.length>0" @scrolltolower="loadMore">
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
    </scroll-view>
    <p  v-else style="color:#878B8E;font-size:30rpx;margin-top: 289rpx;text-align: center;">暂无数据</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        current: 3,
        keyIndex:0,
        deviceName:'',
        list: [{
          location: {}
        }],
        tabsList:[
          {name:'全部',valvue: 0,checked: true},
          {name:'在线',valvue: 1,checked: false},
          {name:'离线',valvue: 2,checked: false}
        ]
      }
    },
    mounted(){
      this.getDeviceList({
        type: this.keyIndex,
        size: 10,
        number:'',
        keyword: ''
      })
    },
    methods: {
      async getDeviceList(data){
        let result = await this.$http.deviceList(data)
        if(result && result.data){
          this.list = result.data.dataList
        }
      },
      changeTabs(x,key){
        this.keyIndex = key
        this.getDeviceList({
            type: this.keyIndex,
            size: 10,
            number: 1,
            keyword: ''
          }
        );
      },
      search(){
        console.log(this.deviceName)
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
        wx.navigateTo({url: '/pages/home/track/main'})
      },
      goTrack(item){
        console.log(item)
        wx.navigateTo({url: '/pages/home/track/main'})
      },
      goSetting(item){
        console.log(item)
        wx.navigateTo({url: '/pages/setting/device/setting/main'})
      },
      more(item){
        console.log(item.imei)
        const that =this
        wx.showActionSheet({
          itemList: ['编辑', '解绑'],
          success (res) {
            console.log(res.tapIndex)
            if(res.tapIndex == 0){
              wx.navigateTo({url: '/pages/setting/device/edit/main',query:{imei:item.imei}})
            }else if(res.tapIndex == 1){
              that.unbindEvent()
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
      loadMore(){
        console.log(11)
        this.getDeviceList()
      }
    }
  };
</script>

<style lang="less" scoped>
.device_list{
  position: relative;
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
