// pages/bjsjd_3/bjsjd_3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx: -1,
    list: [],
    name: '加工厂'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    this.setData({
      idx: options.idx,
      list: app.globalData.sjd_list,
    })
    this.setData({
      name: this.data.list[this.data.idx].name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 编辑入口
   */
  clickEdit: function () {
    var app = getApp();
    wx.navigateTo({
      url: '../../pages/bjsjd/bjsjd?idx=' + this.data.idx,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var app = getApp();
    this.setData({
      list: app.globalData.sjd_list
    })
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