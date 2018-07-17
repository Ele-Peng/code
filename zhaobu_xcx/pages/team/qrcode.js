import { $wuxQrcode } from '../../components/wux'

Page({
  data: {
    heading:"邀请加入",
    value: '',
  },

  onLoad: function(options) {
    var team_code = options.code;
    this.renderQrcode('qrcode', 'https://z.yiumall.com/q?q=team:' + team_code);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getApp().globalData.lastUrl = '../order/order_list'
    this.setData({
      lastUrl: getApp().globalData.lastUrl,
    });
  },
  bindinput(e) {
    const value = e.detail.value

    this.setData({
      value,
    })

    this.renderQrcode('qrcode', value)
  },
  previewImage() {
    wx.canvasToTempFilePath({
      canvasId: 'qrcode',
      success: res => {
        wx.previewImage({
          urls: [res.tempFilePath]
        })
      }
    })
  },
  randomColor() {
    const colorStr = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase()
    const length = colorStr.length
    const prefixStr = `000000`.substring(0, 6 - colorStr.length)
    return `#${prefixStr}${colorStr}`
  },
  renderQrcode(canvasId, value) {
    $wuxQrcode.init(canvasId, value, {
      fgColor: this.randomColor()
    })
  },
})