// pages/order/pay.js
import { $wuxToast } from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0,
    order_id: 0,
    heading: "支付信息",
    lastUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      money: options.money,
      order_id: options.id
    });
  },

  onReportPaid: function (e) {
    console.log(e);
    var formId = e.detail.formId;
    var url = "https://by.edenhe.com/api/order/" + this.data.order_id + "/notify_paid/?form_id=" + formId;
    wx.request({
      url: url,
      method: 'post',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        $wuxToast.show({
          type: 'success',
          timer: 1500,
          color: '#fff',
          text: '提交成功',
        })
      },
      fail: function (res) {
        console.log(res.data);
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
    getApp().globalData.lastUrl = '../order/general_detail_list'
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
})