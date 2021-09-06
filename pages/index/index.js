const app = getApp()
import key from '../../config/index'
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min');

var qqmapsdk
var minOffset = 30;
var minTime = 60;
var startX = 0;
var startY = 0;
var startTime = 0;

Page({
  data: {
    latitude: 34.75,
    longitude: 113.66,
    statusBar: null,
    height: '40%',
    city: null,
    circles:[{
      latitude: '23.099994',
      longitude: '113.324520',
      color: '#FF0000DD',
      fillColor: '#7cb5ec88',
      radius: 400,
      strokeWidth: 2
    }],
  },

  onLoad() {
    this.getLocation()
    qqmapsdk = new QQMapWX({
      key: 'QE3BZ-R7ICD-ZIS42-HCM3D-N2GY5-CZFWQ'
    });
    this.setData({
      statusBar: app.globalData.statusBar
    })

  },
  onShow: function () {
    qqmapsdk.search({
      keyword: '华强',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  getLocation() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          speed: res.speed,
          [`circles[0].latitude`]: res.latitude,
          [`circles[0].longitude`]: res.longitude,
        })
        that.getCity(res.latitude, res.longitude)
      }
    })
  },
  getCity(latitude, longitude){
    let that = this
    qqmapsdk.reverseGeocoder({
      sig: key.sig,
      location: {latitude, longitude} || '',
      // location: '35.978283,115.86075',
      success(res){ 
        console.log("城市",res);
        console.log(res.result.address_component.district);
        that.setData({
          city: res.result.address_component.district
        })
      },
      fail(err) {
        console.log("获取城市失败", err);
      }
    })
  },
  touchStart(e) {
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
    startTime = new Date().getTime();
  },
  touchCancel(e) {
    startX = 0;
    startY = 0;
    startTime = 0;
  },
  touchEnd(e) {
    let that = this
    var endX = e.changedTouches[0].pageX;
    var endY = e.changedTouches[0].pageY;
    var touchTime = new Date().getTime() - startTime;
    if (touchTime >= minTime) {
      var xOffset = endX - startX;
      var yOffset = endY - startY;
      if (Math.abs(xOffset) >= Math.abs(yOffset) && Math.abs(xOffset) >= minOffset) {
        if (xOffset < 0) {
          console.log('向左滑动')
        } else {
          console.log('向右滑动')
        }
      } else if (Math.abs(xOffset) < Math.abs(yOffset) && Math.abs(yOffset) >= minOffset) {
        if (yOffset < 0) {
          console.log('向上滑动')
          that.setData({
            height: '85%'
          })
        } else {
          console.log('向下滑动')
          that.setData({
            height: '40%'
          })
        }
      }
    } else {
      console.log('滑动时间过短', touchTime)
    }
  },
})