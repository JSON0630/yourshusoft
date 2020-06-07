<template>
  <div class="HomeIndex">
    <TopSearch />
    <Message :hasNewMsg="hasNewMsg" @close="hasNewMsg=false"/>
    <MapChoose :hasNewMsg="!hasNewMsg" :mapType="mapType" @change="handleMapTypeChange"/>
    <PopAddress />
    <PosBottom />
    <map
      id="map"
      longitude="113.324520"
      latitude="23.099994"
      cale="14"
      :controls="controls"
      bindcontroltap="controltap"
      :markers="markers"
      bindmarkertap="markertap"
      :polyline="polyline"
      bindregionchange="regionchange"
      show-location
      style="width: 100%; height: 100vh;"
    />
  </div>
</template>

<script>
import TopSearch from './comp/TopSearch'
import Message from './comp/Message'
import MapChoose from './comp/MapChoose'
import PopAddress from './comp/PopAddress'
import PosBottom from './comp/PosBottom'
import { MAP_TYPE } from '@/global/constants'

export default {
  components: {
    TopSearch,
    Message,
    MapChoose,
    PopAddress,
    PosBottom
  },
  data: () => ({
    hasNewMsg: true,
    mapType: MAP_TYPE.standard,
    markers: [{
      iconPath: "/static/resources/home/question.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/static/resources/home/pos.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  }),
  methods: {
    handleMapTypeChange (type) {
      this.mapType = type
    },
    regionchange(e) {
      console.log(e.type)
    },
    markertap(e) {
      console.log(e.detail.markerId)
    },
    controltap(e) {
      console.log(e.detail.controlId)
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
