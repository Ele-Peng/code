// pages/colorStyle/index.js
import { $wuxToast } from '../../components/by'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "颜色样式设置",
    lastUrl: "",
    items: [
      { name: '人', value: '人' },
      { name: '其他', value: '其他', checked: 'true' },
      { name: '净色特种', value: '净色特种' },
      { name: '动物', value: '动物' },
      { name: '圆点', value: '圆点' },
      { name: '条纹', value: '条纹' },
      { name: '格子', value: '格子' },
      { name: '植物', value: '植物' },
      { name: '素色', value: '素色' },
    ],
    radio_list: ""
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

  radioChange: function (e) {
    var that = this;
    console.log(e);
    that.setData({
      radio_list: e.detail.value
    })
    console.log(that.data.radio_list);
  },

  onSubmit: function (e) {
    
  }
})