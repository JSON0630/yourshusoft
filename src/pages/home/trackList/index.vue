<template>
  <div class="trackList">
    <div class="no_data" v-if="isNoData">暂无数据～</div>
    <div v-else>
      <div class="item" v-for="(x, i) in list" :key="i">
        <div class="left">
          <div class="title ellipsis">{{ x.address }}</div>
          <div class="desc">
            <div class="li">
              <span>经度：{{ x.lng }}</span>
              <span>纬度：{{ x.lat }}</span>
            </div>
            <div class="li">
              <span>海拔：0</span>
              <span>日期：{{ x.date }}</span>
            </div>
          </div>
        </div>
        <div class="right">定位模式：{{ getType(x.type) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isNoData: false,
    list: []
  }),
  onLoad (options) {
    this.trackRecordList(options.imei)
  },
  methods: {
    async trackRecordList (imei) {
      const { success, msg, data } = await this.$http.trackRecordList({imei})
      if (!success) { wx.showToast({ title: msg, icon: 'none' }) }
      if (data.length) {
        this.list = data
      } else {
        this.isNoData = true
      }
    },
    getType (type) {
      switch (type) {
        case 1: return 'gps'
        case 2: return 'WIFI'
        case 3: return '基站'
        default: '--'
      }
    }
  }
}
</script>

<style lang="less">
.no_data {
  text-align: center;
  padding-top: 100rpx;
}
.trackList {
  background: #f8f8f8;
  min-height: 100vh;
  .item {
    background: #fff;
    margin: 20rpx 0;
    display: flex;
    padding: 30rpx;
    .left  {
      width: 68vw;
      .title {
        font-size: 24rpx;
        color: #666;
      }
      .li {
        font-size: 20rpx;
        color: #999;
        margin-top: 8rpx;
        span {
          margin-right: 20rpx;
        }
      }
    }
    .right {
      font-size: 24rpx;
      color: #999;
      width: 200rpx;
    }
  }
}
</style>
