// pages/dtjdd/dtjdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dingdan: {},
    all_items: {},
    last_sum: 0.00,
    is_show_pay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gwc = getApp().globalData.gwc;
    var sum = 0;
    console.log(gwc)
    for (var i in gwc.all_items) {
      var t_sum = 0;
      for (var j in gwc.all_items[i].items) {
        t_sum += parseFloat(gwc.all_items[i].items[j].price) * parseFloat(gwc.all_items[i].items[j].num);
        sum += parseFloat(gwc.all_items[i].items[j].price) * parseFloat(gwc.all_items[i].items[j].num);
      }
      gwc.all_items[i].sum = t_sum.toFixed(2);
    }
    sum = sum.toFixed(2);
    this.setData({
      dingdan: gwc,
      last_sum: sum
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  pay_help: function (e) {
    this.setData({
      is_show_pay: true
    })
  },

  // 支付事件
  pay_event: function (e) {
    wx.navigateTo({
      url: '../fkxx/fkxx',
    })
  },

  // 取消支付事件
  depay_event: function (e) {
    this.setData({
      is_show_pay: false
    })
  },
  show_item: function (e) {
    var that = this;
    if (!e.target.dataset.is_pay) {
      e.target.dataset.is_pay = false;
    }
    wx.navigateTo({
      url: '../twxx/twxx?is_pay=' + e.target.dataset.is_pay + '&cloth_id=' + e.target.dataset.cloth_id
    })
  }
})