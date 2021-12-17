const app = getApp()

var qqmapsdk = app.globalData.qqmapsdk


Page({
	data: {
		searchVal: null,
		city: null,
		hotCity: ['郑州市', '北京市', '西安市', '重庆市', '广州市', '深圳市', '上海市', '濮阳市'],
		listCity: {

		}
	},
	onLoad: function (options) {
		this.setData({ city: options.city });
		let list = [];
    for (let i = 0; i < 26; i++) {
      list[i] = String.fromCharCode(65 + i)
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
		this.getCityList()
	},

	getCityList() {
		let that = this
		qqmapsdk.getCityList({ 
			success: function(res) {//成功后的回调
        console.log(res);
        console.log('省份数据：', res.result[0]); //打印省份数据
        console.log('城市数据：', res.result[1]); //打印城市数据
        console.log('区县数据：', res.result[2]); //打印区县数据
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
		})
	},
	onSearch(e) {
		let that = this
		let searchVal = e.detail.value;
		that.setData({ searchVal: searchVal})
	},
	onCleanSearch() {
		this.setData({ searchVal: null })
	},
	toCityBack(e) {
		wx.navigateBack({
			delta: 1,
		})
	}
})