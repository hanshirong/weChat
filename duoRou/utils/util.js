const regeneratorRuntime=require('./rgRt.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//封装异步接口
const wrapAsync = api => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, { success: resolve, fail: reject }), ...params);
    });
  }
}

//封装wx.request
const requestP = wrapAsync(wx.request)

//封装apiGet
const apiGet = async (url, data, noAuth = false) => {
  const header = {}
  if (!noAuth) {
    header['Authorization'] = 'token ' + getApp().token
  }
  if (url[0] === '/') url = 'https://hducp.hduhelp.com' + url
  const { data: dataRecv } = await requestP({ url, data, header })
  if (!dataRecv.error) return dataRecv.data; else throw new Error(dataRecv.msg)
}

//封装apiPost
const apiPost = async (url, data, noAuth = false) => {
  const header = {}
  if (!noAuth) {
    header['Authorization'] = 'token ' + getApp().token
  }
  if (url[0] === '/') url = 'https://hducp.hduhelp.com' + url
  const { data: dataRecv } = await requestP({ url, data, header, method: 'POST' })
  if (!dataRecv.error) return dataRecv.data; else throw new Error(dataRecv.msg)
}

//所有的module
module.exports = {
  formatTime,
  apiGet,
  apiPost,
  requestP,
  wrapAsync
}
