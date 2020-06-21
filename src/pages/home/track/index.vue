<template>
  <div class="HomeTrack">
    <map
      id="map"
      :polyline="polyline"
      :include-points="points"
      :markers="markers"
      style="width: 100%; height: 100vh;"
    />
    <SearchOptions :date="date" @submit="trackRecordList"/>
    <div class="bottom">
      <!-- <div class="media_btn">
        <img class="img_m_left" src="/static/resources/home/m_left.png" alt="">
        <img class="img_m_pause" src="/static/resources/home/m_pause.png" alt="">
        <img class="img_m_right" src="/static/resources/home/m_right.png" alt="">
        <button class="btn">快</button>
      </div> -->
      <div class="info">
        <div class="address">
          <div class="text">{{ recordLast.address }}</div>
          <div class="time">{{ recordLast.date }}   定位模式:{{ recordLast.type }}</div>
        </div>
        <div class="all_btn" @click="goTrackList">
          <img class="img_all_track" src="/static/resources/home/all_track.png" alt="">
          <div class="text">所有轨迹</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchOptions from './comp/SearchOptions'
import { formatTime } from '@/utils'

export default {
  components: { SearchOptions },
  data: () => ({
    date: '',
    deviceImei: '',
    recordLast: {},
    trackList: [],
    points: [],
    startTime: '',
    endTime: ''
  }),
  computed: {
    ...mapState(['imei']),
    polyline () {
      return [{
        points: this.points,
        color: '#4c8eff',
        width: 4,
        arrowLine: true
      }]
    },
    markers () {
      return this.points.slice(-1).map(pos => ({
        iconPath: '/static/resources/home/point_now.gif',
        ...pos,
        id: 0,
        width: 40,
        height: 48
      }))
    }
  },
  onLoad (options) {
    console.log(options.imei)
    this.deviceImei = options.imei || this.imei
    this.trackRecordLast()
    // this.trackRecordCheck()
    this.trackRecordList({
      dataTypeList: [1, 2, 3],
      rectify: false,
      date: formatTime(Date.now(), 'yyyy-MM-dd')
    })
  },
  methods: {
    async trackRecordLast () {
      const { success, data, msg } = await this.$http.trackRecordLast({imei: this.deviceImei})
      if (!success) { return wx.showToast({ title: msg, icon: 'none' }) }
      this.recordLast = data
    },
    // async trackRecordCheck () {
    //   const { success, data, msg } = await this.$http.trackRecordCheck({imei: this.deviceImei})
    //   if (!success) { return wx.showToast({ title: msg, icon: 'none' }) }
    //   if (!data.length) { return wx.showToast({ title: '无轨迹记录', icon: 'none' }) }
    //   this.trackRecordList({
    //     dataTypeList: [1, 2, 3],
    //     rectify: false,
    //     date: data[data.length - 1]
    //   })
    // },
    async trackRecordList (params) {
      this.date = params.date
      this.startTime = formatTime(params.date, 'yyyy年MM月dd日 ') + '00:00:00'
      this.endTime = formatTime(params.date, 'yyyy年MM月dd日 ') + '23:59:59'
      const { success, data, msg } = await this.$http.trackRecordList({
        imei: this.deviceImei,
        startTime: this.startTime,
        endTime: this.endTime,
        ...params
      })
      if (!success) { return wx.showToast({ title: msg, icon: 'none' }) }
      if (!data.length) { return wx.showToast({ title: '无记录', icon: 'none' }) }
      this.trackList = Object.freeze(data)
      this.points = data.map(pos => ({latitude: pos.lat, longitude: pos.lng}))
    },
    goTrackList () {
      wx.navigateTo({
        url: `/pages/home/trackList/main?imei=${this.deviceImei}&startTime=${this.startTime}&endTime=${this.endTime}`
      })
    }
  }
}
</script>

<style lang="less">
.HomeTrack {
  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    background: rgba(256, 256, 256, .8);
    box-shadow: 0 0 6rpx #ccc;
    .media_btn {
      display: flex;
      align-items: center;
      height: 120rpx;
      border-bottom: 1rpx solid #ccc;
      img {
        margin-left: 15vw;
      }
      .btn {
        color: #fff;
        background: #9B9B9B;
        width: 108rpx;
        height: 62rpx;
        line-height: 62rpx;
        font-size: 24rpx;
        margin-left: 20vw;
      }
    }
  }
  .info {
    display: flex;
    align-items: center;
    height: 140rpx;
    .address {
      flex: 1;
      padding: 0 40rpx;
      .text {
        font-size: 28rpx;
        color: #666;
      }
      .time {
        font-size: 24rpx;
        color: #999;
        margin-top: 10rpx;
      }
    }
    .all_btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-left: 2px dashed #ccc;
      height: 100rpx;
      padding: 0 30rpx;
      .text {
        font-size: 28rpx;
        color: #666;
        margin-top: 10rpx;
      }
    }
  }
  .img {
    &_m_left { width: 25rpx; height: 25rpx; }
    &_m_pause { width: 25rpx; height: 29rpx; }
    &_m_right { width: 25rpx; height: 25rpx; }
    &_all_track { width: 46rpx; height: 39rpx; }
  }
}
</style>
