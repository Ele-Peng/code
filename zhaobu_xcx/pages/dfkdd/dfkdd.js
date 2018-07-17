// pages/dfkdd/dfkdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dingdan: {},
    heading: "待付款订单"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://39.104.71.13:8001/dingdan/',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫detail的这个数组中
        that.setData({
          dingdan: res.data.data
          //res代表success函数的事件对，data是固定的
        });
      }
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
    this.title = this.selectComponent("#title");
    getApp().globalData.lastUrl = '../order/order_list'
    this.setData({
      lastUrl: getApp().globalData.lastUrl,
    });
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
  
  }
})