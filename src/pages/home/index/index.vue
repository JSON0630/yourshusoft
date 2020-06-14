<template>
  <div class="HomeIndex">
    <TopSearch
      :deviceList="deviceList"
      :currentDevice="device.current"
      @deviceChange="handeDeviceChange"
      @search="handleSearch"
    />
    <Message :unreadCount="unreadCount" @close="unreadCount=0"/>
    <MapChoose :isTop="unreadCount===0" :mapType="mapType" @change="handleMapTypeChange"/>
    <PopAddress :device="device.detail" @onPos="handlePos" @daohang="handleDaohang"/>
    <PosBottom />
    <map
      id="map"
      :enable-satellite="mapType===MAP_TYPE.satellite"
      :longitude="device.pos.lng"
      :latitude="device.pos.lat"
      scale="100"
      show-location
      style="width: 100%; height: 100vh;"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TopSearch from './comp/TopSearch'
import Message from './comp/Message'
import MapChoose from './comp/MapChoose'
import PopAddress from './comp/PopAddress'
import PosBottom from './comp/PosBottom'
import { MAP_TYPE } from '@/global/constants'

let map = null
export default {
  components: {
    TopSearch,
    Message,
    MapChoose,
    PopAddress,
    PosBottom
  },
  data: () => ({
    device: {
      current: {},
      pos: {
        lng: '113.324520',
        lat: '23.099994'
      },
      detail: {}
    },
    deviceList: [],
    unreadCount: 0,
    mapType: MAP_TYPE.standard
  }),
  computed: {
    MAP_TYPE () { return MAP_TYPE }
  },
  mounted () {
    map = wx.createMapContext('map')
    this.getDeviceList()
    this.noticeUnreadCount()
  },
  methods: {
    ...mapMutations(['update']),
    async getDeviceList () {
      const { success, data } = await this.$http.deviceList({type: 0})
      if (success && data.length) {
        this.deviceList = data.dataList
        this.handeDeviceChange(data[0])
      }
    },
    async noticeUnreadCount () {
      const { success, data } = await this.$http.noticeUnreadCount()
      if (success) { this.unreadCount = data }
    },
    async deviceGet (imei) {
      const { success, data } = await this.$http.deviceGet({imei})
      if (success) { this.device.detail = data }
    },
    async deviceRefreshGps (imei) {
      const { success, data, msg } = await this.$http.deviceRefreshGps({imei})
      if (!success) return wx.showToast({ title: msg, icon: 'none' })
      this.device.pos = data
    },
    async handleSearch (search) {
      const { success, data } = await this.$http.deviceSearch({imei: search, val: 1})
      if (success) { this.deviceList = data }
    },
    handeDeviceChange (device) {
      this.device.current = device
      this.deviceRefreshGps(device.imei)
      this.deviceGet(device.imei)
      this.update({deviceInfo: {imei: device.imei, ...this.device.pos}})
    },
    handlePos () {
      const { lng, lat } = this.device.pos
      map.moveToLocation({
        longitude: lng,
        latitude: lat,
        success: () => {
          console.log('-----success===')
        },
        fail: () => {
          console.log('------fail====')
        }
      })
    },
    handleDaohang () {
      wx.getLocation({
        type: 'wgs84', // 返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
        success: function (res) {
          wx.openLocation({
            latitude: 22.5542080000,
            longitude: 113.8878770000,
            name: "宝安中心A地铁口xxxxx",
            address:'宝安中心A地铁口xxxxx'
          })
        }
      })
    },
    handleMapTypeChange (type) {
      this.mapType = type
    }
  }
};
</script>

<style lang="less">
.HomeIndex {
  background: rgb(103, 187, 103);
  height: 100vh;
  display: flex;
  justify-content: center;
}
</style>
