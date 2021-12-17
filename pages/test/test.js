const app = getApp()

var qqmapsdk = app.globalData.qqmapsdk
var minOffset = 30;
var minTime = 60;
var startX = 0;
var startY = 0;
var startTime = 0;

Page({
  data: {
    latitude: 34.75,
    longitude: 113.66,
    CustomBar: app.globalData.CustomBar,
    height: '40%',
    cityInfo: null,
    circles:[{
      latitude: '23.099994',
      longitude: '113.324520',
      color: '#7cb5ec',
      fillColor: '#7cb5ec38',
      radius: 300,
      strokeWidth: 1,
      level: 'abovebuildings'
    }],
  },
  onLoad() {
    this.getLocation()

  },
  onShow: function () {

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
      sig: app.globalData.sig,
      location: {latitude, longitude} || '',
      success(res){ 
        console.log("城市",res);
        that.setData({
          cityInfo: res.result.address_component 
        }, res => {
          that.getWeather()
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
          if (that.data.height === '10%'){
            that.setData({
              height: '40%'
            })
          } else {
            that.setData({
              height: '85%'
            })
          }
        } else {
          console.log('向下滑动')
          if (that.data.height === '85%'){
            that.setData({
              height: '40%'
            })
          } else { 
            that.setData({
              height: '10%'
            })
          }

        }
      }
    } else {
      console.log('滑动时间过短', touchTime)
    }
  },
  getWeather() {
    let that = this
    wx.pro.request({
      url: `https://wis.qq.com/weather/common?source=pc&weather_type=observe|tips&province=${that.data.cityInfo.province}&county=${that.data.cityInfo.district}&city=${that.data.cityInfo.city}`,
      method: 'GET',
      header: {'content-type': 'application/json'}
    }).then(res => {
      console.log(res);
      that.setData({
        weather: res.data.data
      })
    }).catch(err => {
      console.log(err)
    }).finally(() => {

    })
  },
  toCityList() {
    let city = this.data.cityInfo.city
    wx.navigateTo({
      url: `/pages/city-list/city-list?city=${city}`,
    })
  }

})