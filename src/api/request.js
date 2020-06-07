const host = 'https://api.youshusoft.com'
const context = '/gpsserver/api'

export default {
  post: (url, data) => new Promise(function (resolve, reject) {
    console.log('---enter---')
    wx.request({
      url: host + context + url,
      method: 'POST',
      data,
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        // 自定义请求头
        // 'access-token': app.globalData.access_token, // 访问令牌
        // 'user-token': app.globalData.user_token, // 登录令牌
        'version': 'v1.0' // 版本号
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
        // fail调用接口失败
        reject({ error: '网络错误', code: 0 });
      },
      complete: function (res) {
        // complete
      }
    })
  })
}