import { promisifyAll, promisify } from './libs/wx-promise-pro'
promisifyAll()

import key from './config/index'
var QQMapWX = require('./libs/qqmap-wx-jssdk.min');


App({
  onLaunch() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
      if (capsule) {
        this.globalData.Custom = capsule;
        this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
      } else {
        this.globalData.CustomBar = e.statusBarHeight + 50;
      }
        }
      })
  },




  globalData: {
    CustomBar: null,
    initLatitude: null,
    initLongitude: null,
    sig: key.sig,
    qqmapkey: key.qqmapkey,
    qqmapsdk : new QQMapWX({
      key: key.qqmapkey
    })
  }
})
