import store from '@/store'

const host = 'https://api.youshusoft.com'
const context = '/gpsserver/api'

export default {
  post: (url, data) => new Promise(function (resolve, reject) {
    wx.request({
      method: 'POST',
      url: host + context + url,
      data,
      header: {
        // 'content-type': 'application/x-www-form-urlencoded',
        'token': store.getters.token,
        'version': 'v1.0'
      },
      success: function (res) {
        console.log('---success---')
        if (res.statusCode != 200) {
          reject({ error: '服务器忙，请稍后重试', code: 500 });
          return;
        }
        res.data.success = res.data.code === 0
        resolve(res.data);
      },
      fail: function (res) {
        console.log('---fail---')
        reject({ error: '网络错误', code: 0 });
      },
      complete: function (res) {
        // complete
      }
    })
  })
}