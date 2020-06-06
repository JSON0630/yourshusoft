<template>
  <div class="HomeIndex">
    <div class="search">
      <div class="avtar"></div>
      <div>名称</div>
      <input class="weui-input" auto-focus placeholder="将会获取焦点"/>
    </div>
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
  export default {
    data: () => ({
      markers: [{
        iconPath: "/resources/others.png",
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
        iconPath: '/resources/location.png',
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
  display: flex;
  justify-content: center;
  .search {
    width: 720rpx;
    height: 7.2vh;
    position: absolute;
    top: 63rpx;
    background: #fff;
    z-index: 1;
    display: flex;
    align-items: center;
  }
}
</style>
