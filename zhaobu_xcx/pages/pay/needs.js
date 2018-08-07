// pages/pay/needs.js

import { $wuxToast } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'
import { $wuxDialog } from '../../components/wux'
import { $wuxPrompt } from '../../components/wux'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "需求支付",
    lastUrl: "",
    show_optional: true,
    is_check_1: false,
    is_check_2: true,
    is_check_3: false,
    amount: 0,
    vip: {
      find_cloth_card: 0,
      score: 0,
      vip_lvl: 0,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      amount: options.amount,
      needs_id: options.needs_id
    })
    console.log(options);
    var that = this;

    wx.showLoading({
      title: '正在加载',
    })

    wx.request({
      url: 'https://by.edenhe.com/api/bind/team_vip',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        var vip = res.data.data;
        that.setData({
          vip: vip,
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

  onCredits: function () {
    this.setData({
      show_optional: !this.data.show_optional
    })
  },

  checkPay_1: function () {
    if (this.data.is_check_1) {
      this.setData({
        is_check_1: false,
      });
    } else {
      this.setData({
        is_check_1: true,
        is_check_2: false,
        is_check_3: false,
      });
    }
  },

  checkPay_2: function () {
    if (this.data.is_check_2) {
      this.setData({
        is_check_2: false,
      });
    } else {
      this.setData({
        is_check_1: false,
        is_check_2: true,
        is_check_3: false,
      });
    }
  },

  checkPay_3: function () {
    if (this.data.is_check_3) {
      this.setData({
        is_check_3: false,
      });
    } else {
      this.setData({
        is_check_1: false,
        is_check_2: false,
        is_check_3: true,
      });
    }
  },
  
  onSubmit: function () {
    this.preparePay(this.data.needs_id);
  },

  showLoading: function (hint) {
    $wuxLoading.show({
      text: hint,
    });
  },

  hideLoading: function () {
    $wuxLoading.hide();
  },

  preparePay: function (order_id) {
    var that = this;
    var pay_method = 'wechat'
    if (that.data.is_check_1) {
      pay_method = 'score'
    }

    console.log(wx.getStorageSync('cookie'));
    wx.request({
      url: 'https://by.edenhe.com/api/pay/' + order_id + '/prepare/?platform=xc&from_xcx=sc',
      method: 'get',
      data: {
        'pay_method': pay_method
      },
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        console.log(res.data.error)
        if (res.data.error != 0 || pay_method == 'wechat') {
          var content = '积分不足，是否使用微信支付'
          if (pay_method == 'wechat') {
            content = '是否使用微信支付'
          }
          wx.showModal({
            title: '提示',
            content: content,
            success: function (res) {
              if (res.confirm) {
                wx.request({
                  url: 'https://by.edenhe.com/api/pay/' + order_id + '/prepare/?platform=xc&from_xcx=sc',
                  method: 'get',
                  data: {
                    'pay_method': pay_method
                  },
                  header: {
                    Cookie: wx.getStorageSync('cookie'),
                  },
                  success: function (res) {
                    console.log(res.data);
                    that.hideLoading();
                    that.startWXPay(order_id, res.data.data);
                  },
                  fail: function (res) {
                    console.log(res.data);
                    that.hideLoading();
                    that.showPaymentFailed();
                  }
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          $wuxToast.show({
            type: 'success',
            timer: 1500,
            color: '#fff',
            text: '支付成功',
            success: function () {
              wx.setStorageSync('needs_inprogress_changed', true)
              wx.setStorageSync('needs_unpaid_changed', true)
              wx.navigateBack({
                delta: 2
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.showPaymentFailed();
      }
    });
  },

  startWXPay(order_id, data) {
    // appid:"wxd931d7672c96f87d"
    // noncestr:"4dd937e9a341463bb718b6c5462a03ac"
    // package:"prepay_id=wx20170821231109664c2a5a390676680221"
    // sign:"55B40BFEE1BF8AA2B1CD4539183AA755"
    // signtype:"MD5"
    // timestamp:1503328269
    var that = this;
    wx.requestPayment({
      'appId': data.appid,
      'timeStamp': '' + data.timestamp,
      'nonceStr': data.noncestr,
      'package': data.package,
      'signType': data.signtype,
      'paySign': data.sign,
      success: function (res) {
        console.log(res);
        that.showPaymentOK();
      },
      fail: function (res) {
        console.log(res);
        that.showPaymentFailed();
      }
    })
  },

  showPaymentFailed: function () {
    $wuxToast.show({
      type: 'cancel',
      timer: 1500,
      color: '#fff',
      text: '支付失败',
      success: function () {

      }
    })
  },

  showPaymentOK: function () {
    wx.setStorageSync('needs_inprogress_changed', true)
    wx.setStorageSync('needs_unpaid_changed', true)
    var that = this
    $wuxToast.show({
      type: 'success',
      timer: 1500,
      color: '#fff',
      text: '支付成功',
      success: function () {
        wx.navigateBack({
          delta: 2
        })
      }
    })
  }
})