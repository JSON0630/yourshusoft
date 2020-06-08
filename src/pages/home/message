<template>
  <div class="message_box">
    <p @click="screenEvent" class="message_shaixuan">筛选<span></span></p>
    <div class="message_List">
      <div class="message_item" v-for="(x,key) in messageList" :key="key">
        <img class="person_img" src="/static/resources/setting/person.png"/>
        <div class="message_item_text">
          <p>存放 Pro</p>
          <p>断开充电连接连接</p>
          <p>充电报警</p>
          <p>2020-05-20 21:33:26</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    data: () => ({
      messageList: [1,2,3,4,5,6]
    }),
    methods:{
      screenEvent(){
        wx.showActionSheet({
          itemList: ['A', 'B', 'C'],
          success (res) {
            console.log(res.tapIndex)
          },
          fail (res) {
            console.log(res.errMsg)
          }
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .message_box {
    position: relative;
    background: #F6F6F6;
    height: 100%;
    padding: 20rpx 0rpx;
    .message_shaixuan{
      position: fixed;
      background: #fff;
      width: 100%;
      height: 90rpx;
      line-height: 90rpx;
      font-size: 30rpx;
      color: #4EB9FF;
      text-align: center;
      top: 0;
      left: 0;
      span{
        width: 0;
        height: 0;
        border-left: 25rpx solid transparent;
        border-right: 25rpx solid transparent;
        border-top: 25rpx solid #4EB9FF;
        vertical-align: bottom;
      }
    }
    .message_List{
      margin-top: 110rpx;
      .message_item{
        background: #fff;
        /*height: 220rpx;*/
        padding: 10rpx 30rpx;
        margin-bottom: 30rpx;
        .person_img{
          vertical-align: top;
          margin-top: 30rpx;
        }
        .message_item_text{
          display: inline-block;
          margin-left: 30rpx;
          font-size: 24rpx;
          color: #808080;
          >p{
            margin-bottom: 10rpx;
            &:nth-child(1){
              font-size: 36rpx;
              color: #000;
            }
            &:nth-child(2){
              font-size: 26rpx;
              color: #000;
            }
          }
        }
      }
    }
    .person_img{
      height: 120rpx;
      width: 120rpx;
      border-radius: 50%;
    }
  }
</style>
