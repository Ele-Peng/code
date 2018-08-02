// pages/helper/prgress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "找布说明",
    lastUrl: "" 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    //获得title 标题栏组件
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
  
  },

  onPreivewImg: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var urls = [];
    if (e.currentTarget.dataset.imgs) {
      urls.push(e.currentTarget.dataset.imgs);
    }
    wx.previewImage({
      current: urls[parseInt(index)],
      urls: urls,
    });
  },
})