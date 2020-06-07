<template>
  <div class="device_setting">
      <div class="device_setting_box">
          <div class="device_setting_item">
            <div class="device_text">
              <span>省电设置</span>
              <img class="arr_right"  src="/static/resources/arr_right.png"/>
              </div>
            <div class="shengdian_set">
                <p class="time_zidong">自动定位时间</p>
                <div class="time_list">
                  <radio-group bindchange="radioChange">
                    <div class="time_item" v-for="(x,key) in items" :key=key > 
                      <span>{{x.label}}</span>
                      <label class="radio"><radio :value="x.value" :checked="checked"/></label>
                    </div>
                  </radio-group>
                </div>
                <p class="time_title">提示：设置的时间越短，位置更新越快轨迹越连贯同时电量和流量消耗越快，建议不同的需求设置不同的时间</p>
            </div>
          </div>
          <div class="device_setting_item device_ding">
            <div class="device_text">
              <span>定位设置</span>
               <img class="arr_right"  src="/static/resources/arr_right.png"/>
            </div>
            <div class="dingwei_set">
              <div class="dingwei_list">
                <div class="dingwei_item">
                  <span>GPS+A-GPS+北斗</span>
                 <label class="device_switch">
                     <switch :checked="Checked" bindchange="switch1Change"/>
                  </label>
                </div>
                <p class="dingwei_p">卫星定位只适用于室内，默认开启（精确度高）</p>
                <div class="dingwei_item">
                  <span>Wi-Fi</span>
                  <label class="device_switch">
                     <switch  :checked="Checked" bindchange="switch1Change"/>
                  </label>
                 
                </div>
                <p class="dingwei_p">WiFi热点定位适用于室内与室外（精确度中）</p>
                <div class="dingwei_item">
                  <span>LBS基站</span>
                  <label class="device_switch">
                     <switch :checked="Checked" bindchange="switch1Change"/>
                  </label>
                </div>
                <p class="dingwei_p">基站定位适用于室内与室外（精确度低）</p>
              </div>
            </div>
          </div>
          <div class="btn_box">
            <button type="" :disabled="disabled" :loading=loading hover-class=“button-hover”>重启设备</button>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
          return {
            Checked: true,
            checked:false,
            items:[
              {
                label:'10秒（耗电极快）',
                value:1
              },
              {
                label:'1分钟（耗电快）',
                value:1
              },
              {
                label:'5分钟（耗电一般）',
                value:1
              },
              {
                label:'10分钟（省电）',
                value:1
              },
              {
                label:'60分钟（非常省电）',
                value:1
              },
              {
                label:'1120分钟（超级省电）',
                value:1
              }
              ]
          }
      },
    methods: {
      switch1Change(){

      },
      radioChange(){

      }
    }
  };
</script>

<style lang="less" scoped>
  .device_setting{
    background: #F6F6F6;
    padding: 40rpx 20rpx;
    font-size: 30rpx;
    .device_setting_box{
      background: #fff;
      // padding: 20rpx 0rpx;
      .device_text{
        padding: 0 20rpx;
        height: 80rpx;
        line-height: 80rpx;
        .arr_right{
          float: right;
          margin-top: 20rpx;
        }
      }
      .shengdian_set{
        .time_zidong{
          background: #F6F6F6;
          height: 60rpx;
          line-height: 60rpx;
          padding-left: 25rpx;
          font-size: 20rpx;
          color: #878B8E;
        }
        .time_list{
          .time_item{
            padding: 0rpx 20rpx;
            border-bottom: 1rpx solid #F6F6F6;
            height: 80rpx;
            line-height: 80rpx;
            font-size: 24rpx;
            .radio{
              float: right;
            }
          }
        }
        .time_title{
          background: #F6F6F6;
          padding: 20rpx 30rpx;
          line-height: 1.5;
          font-size: 20rpx;
          color: #878B8E;
        }
      }
    }
    .device_ding{
      background: #F6F6F6;
      .device_text{
        background: #fff;
        margin-bottom: 30rpx;
      }
    }
    .dingwei_set{
      background: #F6F6F6;
      // margin-top: 30rpx;
      font-size: 30rpx;
      .dingwei_list{
        .dingwei_item{
          position: relative;
          // margin-top: 30rpx;
          background: #fff;
          padding: 0rpx 20rpx;
          height: 80rpx;
          line-height: 80rpx;
          >span{
            display: inline-block;
            width: 81%;
          }
          .device_switch{
            // position: absolute;
            // top: 30rpx;
            // right: 30rpx;
            width: 42rpx;
            height: 25rpx;
            }
        }
        .dingwei_p{
          height: 60rpx;
          line-height: 60rpx;
          padding-left: 25rpx;
          font-size: 20rpx;
          color: #878B8E;
        }
      }

    }
      
    .btn_box{
      background: #F6F6F6;
      >button{
        background:#E64340;
        width: 90%;
        height: 80rpx;
        color: #fff;
        border: none;
        border-radius: 10rpx;
      }
    }
    .arr_right{
      height: 35rpx;
      width: 18rpx;
    }
  }
</style>
