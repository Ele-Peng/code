// pages/boutique/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "精品设置",
    lastUrl: "",
    items: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      items: [
        { name: options.cloth_id, value: options.cloth_id, checked: true }
      ],
      class_list: [
        options.cloth_id
      ],
      cloth_id: options.cloth_id
    })
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
    getApp().globalData.lastUrl = '../order/general_order_list'
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

  },

  onSubmit: function (e) {
    var that = this;
    console.log(e);
    var data = {
      cloth_id: that.data.cloth_id
    };

    wx.request({
      url: 'https://by.edenhe.com/api/selected/add_b/',
      method: 'POST',
      data: data,
      header: {
        Cookie: wx.getStorageSync('cookie'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.showToast({
          title: '修改成功',
        })
        console.log(res.data);
      },
      fail: function (res) {
        console.log(res.data);
        wx.showToast({
          title: '修改失败',
        })
      }
    });
  },

  checkboxChange: function (e) {
    var that = this;
    that.setData({
      class_list: e.detail.value
    })
    console.log(that.data.class_list)
  },

})