<template>
  <div class="device_edit">
    <div class="device_img_box">
      <p @click="unbindEvent" class="jiebang">解绑</p>
      <img @click="uploadImage" class="person_img" :src="deviceInfo.babyAvatar?deviceInfo.babyAvatar:'/static/resources/setting/person.png'" />
      <p>点击可修改头像</p>
      <!-- <p>上传图片</p> -->
      <div class="img_box">
        <div class="img_text">
          <p>{{deviceInfo.effectiveTimeStr}}</p>
          <p>到期</p>
        </div>
        <div class="img_text">
          <p>{{deviceInfo.smsAmount}}</p>
          <p>短信剩余</p>
        </div>
      </div>
    </div>
    <div class="edit_box">
      <p class="edit_p">
        <span>IMEI</span>
        <span>{{deviceInfo.imei}}</span>
      </p>
      <p class="edit_p">
        <span>名称</span>
        <span>{{deviceInfo.babyName}}</span>
      </p>
      <p class="edit_p">
        <span>ICCID</span>
        <span>{{deviceInfo.iccid}}</span>
      </p>
    </div>
    <div class="btn_box" @click="resetEvent">
      <button type="" :disabled="disabled" :loading=loading hover-class=“button-hover”>重启设备</button>
    </div>
  </div>
</template>

<script>
export default {
    data: () => ({
        messageList: [1,2,3,4,5,6],
        'imei':'353520171025838',
        deviceInfo: {
            agent: 1,
            area: null,
            babyAvatar: "http://cdn.youshusoft.com/avatar/2016_09_15_19125217587.jpg",
            babyBirthday: null,
            babyGrade: null,
            babyName: "佛山市顺德区",
            babySex: null,
            bindTime: 1584445941000,
            createTime: 1550803690000,
            deviceMobile: null,
            displacementAlarm: 3,
            displacementAppNotice: true,
            displacementSmsNotice: true,
            dormancyEndTime: "00:00",
            dormancyOn: false,
            dormancyStartTime: "00:00",
            effectiveTime: 2532355200000,
            effectiveTimeStr: "2050-04-01",
            electricity: 95,
            electricityAlarm: 2,
            electricityAppNotice: true,
            electricitySmsNotice: false,
            electricityUpdateTime: 1571997120000,
            fenceAppNotice: true,
            fenceOn: 3,
            fenceSmsNotice: true,
            gpsOn: true,
            iccid: "898602>5261691635985",
            imei: "353520171025838",
            lastActivityTime: 1575305940000,
            lbsOn: false,
            ledOn: false,
            monitorMobile1: "15647165444",
            monitorMobile2: "15621932981",
            neverCloseGps: true,
            neverSleep: false,
            offlineAlarm: 3,
            online: false,
            powerFullTime: 1552538643000,
            powerOffAlarm: 3,
            powerOffAppNotice: true,
            powerOffSmsNotice: true,
            powerSaving: false,
            pushSwitch: false,
            refreshTime: 10,
            shutdownEndTime: "00:00",
            shutdownOn: true,
            shutdownStartTime: "00:00",
            signal: 95,
            smsAmount: 10,
            sosAlarm: 3,
            sosMobile: "15223854434",
            timeZone: null,
            tremorAlarm: 2,
            tremorAppNotice: true,
            tremorSmsNotice: false,
            type: 1001,
            userId: null,
            version: "",
            voiceControlAudio: false,
            wifiOn: true
        },
        urlObj: {},
        url: [],
        count: 1
    }),
    mounted(){
        this.getDeviceInfo();
    },
    methods:{
        async getDeviceInfo(){
            let result = await this.$http.deviceGet({'imei':this.imei })
            if(result && result.data){
                this.deviceInfo = result.data;
            }
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
            if(result){
                // this.deviceInfo = result.data;
                wx.showToast({
                    title: '重启设备成功',
                    icon: 'success',
                    duration: 2000
                })
            }
        },
        resetEvent(){
            wx.showModal({
                title: '',
                content: '请确认是否重启设备？',
                success : (res) => {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        // this.reset();
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        },
        async reset(){
            let result = await this.$http.deviceRestart({'imei':this.imei })
            if(result && result.data){
                // this.deviceInfo = result.data;
                wx.showToast({
                    title: '重启设备成功',
                    icon: 'success',
                    duration: 2000
                })
            }
        },
        imgChange(){
            wx.previewImage({ current: `${this.urlHeader}${src}`, urls: this.showFileList })
        },
        async uploadImage() {
            let chooseRes = { errno: 3021 }
            try {
                chooseRes = await wx.chooseImage({ count: this.count })
            } catch (error) {
                if (error.errMsg !== 'chooseImage:fail cancel') {
                    chooseRes = { errno: 3022 }
                }
            }
            console.log(chooseRes)
            if (chooseRes.errno === 3022) {
                this.toast('warning', '图片选择异常')
                return
            }
            if (chooseRes.errno === 3021) {
                return
            }
            const path = chooseRes.tempFilePaths[0]
            console.log(11,path)
            this.deviceInfo.babyAvatar =  path
            const res = await this.upload(path)
            if (res.errno !== 0) {
                this.toast('warning', '上传异常')
                return
            }
            console.log(res)
            // this.deviceInfo.babyAvatar =  path
            this.$emit('on-upload-event', { src: res.data.url, name: res.data.name, index: this.url.key })
        },
        async upload(filePath) {
            console.log(222,filePath)
            let res = {}
            try {
                res = await wx.uploadFile({
                    url: "http://api.youshusoft.com/gpsserver/api/file/img/upload",
                    filePath: filePath,
                    name: "img"
                })
                console.log(res)
            } catch (e) {
                res = { data: { errno: 1 } }
            }
            if (res.data && res.data.errno === 1) {
                return res.data
            }
            try {
                res.data = JSON.parse(res.data)
            } catch (e) {
                res = { data: { errno: 1 } }
            }
            return res.data
        }
    },
};
</script>

<style lang="less" scoped>
  .device_edit{
    position: absolute;
    background: #F6F6F6;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .device_img_box{
      position: relative;
      background: #4388FF;
      height: 36vh;
      padding-top: 100rpx;
      text-align: center;
      color: #fff;
      width: 100%;
      font-size: 24rpx;
      .jiebang{
        position: absolute;
        top: 0;
        right: 0;
        width: 100rpx;
        height: 90rpx;
        line-height: 90rpx;
      }
      .img_box{
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
      }
      .img_text{
        display: inline-block;
        width: 50%;
        padding: 0 40rpx 20rpx 40rpx;
        &:nth-child(1){
          text-align: left;
          padding-right: 40rpx;
        }
        &:nth-child(2){
          text-align: right;
          padding-right: 40rpx;
        }
      }
    }
    .edit_box{
      background: #fff;
      font-size: 24rpx;
      .edit_p{
        padding: 0 20rpx;
        height: 90rpx;
        line-height: 90rpx;
        border-bottom: 1rpx solid #F6F6F6;
        >span{
          &:nth-child(1){
            display: inline-block;
            width: 100rpx;
          }
        }
      }
    }
    .btn_box{
      position: absolute;
      left: 0;
      bottom: 60rpx;
      width: 100%;
      font-size: 30rpx;
      // background: #F6F6F6;
      >button{
        background:#4388FF;
        width: 90%;
        height: 80rpx;
        line-height: 80rpx;
        color: #fff;
        border: none;
        border-radius: 10rpx;
        font-size: 30rpx;
      }
    }
    .person_img{
      height: 160rpx;
      width: 160rpx;
      border-radius: 50%;
    }
  }
</style>
