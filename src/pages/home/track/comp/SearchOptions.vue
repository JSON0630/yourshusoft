<template>
  <block>
    <div class="DateBtn" @click="showDrawer=true">{{date}}</div>
    <Drawer v-model="showDrawer" from="bottom">
      <div class="SearchOptions">
        <div class="item">
          <div class="name">当前选择:</div>
          <picker mode="date" :value="dates[0]" :start="dates[0]" :end="dates[dates.length-1]" @change="bindDateChange">
            <view class="picker">{{date}}</view>
          </picker>
        </div>
        <div class="item time">
          <div class="name">时间段:</div>
          <picker mode="time" :value="startHour" @change="handleStartHourChange">{{startHour}}</picker>
          <div class="split">-</div>
          <picker mode="time" :value="endHour" @change="handleEndHourChange">{{endHour}}</picker>
          <!-- <TimeLine :startHour="startHour" :endHour="endHour" @change="handleHourChange"/> -->
        </div>
        <div class="item">
          <div class="name">轨迹显示:</div>
          <div class="checkboxs">
            <checkbox-group @change="checkboxChange">
              <label v-for="(x, i) in DATA_TYPES" :key="i">
                <checkbox :value="x.value" :checked="x.checked"></checkbox>
                <text>{{ x.text }}</text>
              </label>
            </checkbox-group>
          </div>
        </div>
        <div class="item">
          <div class="name">智能纠偏:</div>
          <switch :checked="rectify" @change="rectifyChange"/>
        </div>
        <button type="primary" @click="submit">查询</button>
      </div>
    </Drawer>
  </block>
</template>

<script>
import Drawer from '@/components/Drawer'
// import TimeLine from './TimeLine'
import { formatTime } from '@/utils'

export default {
  components: { Drawer },
  props: {
    dates: []
  },
  data: () => ({
    startHour: '01:00',
    endHour: '24:00',
    showDrawer: false,
    rectify: false,
    DATA_TYPES: [
      { value: 1, text: 'gps' },
      { value: 2, text: 'WIFI' },
      { value: 3, text: '基站' }
    ],
    dataTypeList: []
  }),
  methods: {
    bindDateChange (e) {
      this.date = e.target.value
    },
    rectifyChange (e) {
      this.rectify = e.target.value
    },
    checkboxChange (e) {
      this.dataTypeList = e.target.value
    },
    handleStartHourChange (startHour) {
      this.startHour = startHour
    },
    handleEndHourChange (endHour) {
      this.endHour = endHour
    },
    submit () {
      this.$emit('submit', {
        dataTypeList: this.dataTypeList.slice(),
        rectify: this.rectify,
        startTime: formatTime(this.date, 'yyyy年MM月dd日 ') + this.startHour + ':00',
        endTime: formatTime(this.date, 'yyyy年MM月dd日 ') + this.endHour + ':00'
      })
    }
  }
}
</script>

<style lang="less">
.DateBtn {
  position: fixed;
  top: 40rpx;
  right: 0;
  z-index: 1;
  height: 40rpx;
  line-height: 40rpx;
  width: 160rpx;
  border-radius: 20rpx 0 0 20rpx;
  color: #666;
  font-size: 24rpx;
  background: rgba(256, 256, 256, .8);
  box-shadow: 0 0 6rpx #ccc;
  text-align: center;
}
.SearchOptions {
  padding: 30rpx;
  font-size: 32rpx;
  color: #999;
  .item {
    display: flex;
    align-items: center;
    padding: 30rpx 10rpx;
    &.time {
      height: 100rpx;
      .split {
        margin: 0 20rpx;
      }
    }
    .name {
      width: 150rpx;
      margin-right: 20rpx;
      text-align: right;
    }
    .checkboxs {
      label {
        margin-right: 20rpx;
      }
    }
  }
  button {
    margin: 50rpx auto 60rpx;
  }
}
</style>
