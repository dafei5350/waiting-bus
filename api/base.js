import {
  promisifyAll,
  promisify
} from '../libs/wxPromise';

import url from './url';

promisifyAll()

let weather = url.WEATHER_HOST;
let host = url.LOCAL_SERVER

let request = (url, data, type) => new Promise((resolve, reject) => {
  wx.request({
    url: host + url,
    data: data,
    method: type,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': wx.getStorageSync('token')
    },
    success(res) {
      if (res.statusCode === 200) {
        resolve(res)
      }
    }
  })

})
module.exports = {
  base
}