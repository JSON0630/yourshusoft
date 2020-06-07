<template>
  <div class="device_list">
    <div class="device_tab">
      <span v-for="(x,key) in tabsList" :key=key :class="key == 1?'device_checked':''">{{x}}</span>
    </div>
    <div class="search_box">
      <div class="search">
        <img class="search_img" src="/static/resources/setting/search.png"/>
        <input class="search_text" type="text" placeholder="请输入设备名"/>
        <img class="search_img search_del" src="/static/resources/setting/cha.png"/>
      </div> 
    </div>
    <div class="device_item">
      <div class="device_item_top">
          <img class="device_person" src="/static/resources/setting/person.png"/>
          <div>
            <p class="device_status">
              <span class="device_name">名称</span>
                <span class="offline"> 
                  离线
                </span>
              <span class="device_batteray_span"> 
                <img class="device_batteray" src="/static/resources/setting/batteray_0.png"/>
                0%
                </span>
            </p>
            <p class="device_ads">贵州省 毕节市 大方县 石光路 靠近金利家私(石关路) 贵州省 毕节市 大方县 石光路 靠近金利家私</p>
          </div>
      </div>
      <div class="device_item_bottom">
        <p>
              <img class="device_dingwei" src="/static/resources/setting/dingwei.png"/>
                定位
        </p>
        <p>
              <img class="device_guiji" src="/static/resources/setting/guiji.png"/>
                轨迹
        </p>
        <p>
              <img class="device_set" src="/static/resources/setting/set.png"/>
                设置
        </p>
        <p>
              <img class="device_more" src="/static/resources/setting/more.png"/>
                更多
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
          return {
            current: 3,
            tabsList:['全部','在线','离线']
          }
      },
    methods: {
      handleChange(){

      }
    }
  };
</script>

<style lang="less" scoped>
.device_list{
  background: #fff;
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
  .device_item{
    padding: 20rpx 0rpx;
    .device_item_top{
      padding: 0 20rpx 20rpx 20rpx; 
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
