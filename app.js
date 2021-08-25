
const config = require('./config/index')
// var QQMapWX = require('../../libs/qqmap-wx-jssdk.min');

App({
  onLaunch() {
    wx.getSystemInfo({
      success: res => {
        this.globalData.statusBar = res.statusBarHeight;
      }
    })
  },

  globalData: {
    statusBar: null,
    initLatitude: null,
    initLongitude: null,
  }
})
