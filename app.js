
const config = require('./config/index')
<<<<<<< HEAD
=======
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min');
>>>>>>> 9cb8d95 (sdk)

App({
  onLaunch() {
    console.log(config.app);
    // 展示本地存储能力
<<<<<<< HEAD


    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
=======
    


  },
  globalData: {
    latitude: 34.75,
    longitude: 113.66,
>>>>>>> 9cb8d95 (sdk)
  }
})
