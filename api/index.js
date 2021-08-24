import {
  promisifyAll,
  promisify
} from '../libs/wxPromise'




promisifyAll()
// promisify single api
promisify(wx.getSystemInfo)().then(console.log)
wx.pro.showLoading({
  title: '加载中',
  mask: true
})
wx.pro.request({
  url: 'https://cnodejs.org/api/v1/topics',
  data: {},
  method: 'GET',
  header: {
    'content-type': 'application/json'
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
}).finally(() => {
  wx.pro.hideLoading()
})