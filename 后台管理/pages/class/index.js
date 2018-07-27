// pages/class/index.js
import { $wuxToast } from '../../components/by'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "适用品类设置",
    lastUrl: "",
    items: [
      { name: 'T恤/打底衫', value: 'T恤/打底衫' },
      { name: '其他', value: '其他', checked: 'true' },
      { name: '外套', value: '外套' },
      { name: '大衣', value: '大衣' },
      { name: '婴儿服装(哈衣/爬服)', value: '婴儿服装(哈衣/爬服)' },
      { name: '家居服', value: '家居服' },
      { name: '棉衣/羽绒服/户外服', value: '棉衣/羽绒服/户外服' },
      { name: '泳装', value: '泳装' },
      { name: '衬衫', value: '衬衫' },
      { name: '裤子', value: '裤子' },
    ],
    class_list: []
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


  checkboxChange: function (e) {
    var that = this;
    that.setData({
      class_list: e.detail.value
    }) 
  },

  onSubmit: function (e) {
    if (this.data.class_list == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请选择适用品类',
      });
      return;
    }
    console.log(e);
  }
})