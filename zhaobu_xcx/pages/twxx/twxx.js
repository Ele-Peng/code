/* pages/twxx/twxx.js */
import { $wuxLoading } from '../../components/wux'
Page({
  data: {
    heading:"面料详情",
    lastUrl:"",
    detail: {},
    currentTab: 0,
    cloth_id: 0,
    is_click: 0,
    is_pay: false,
    is_show_pay: false,
    db_id: 0
  },
  onLoad: function (options) {
    console.log(options)
    var app = getApp();
    // 页面初始化 options为页面跳转所带来的参数

    // 是否有cloth_id传入
    if (options.cloth_id) {
      console.log(options.cloth_id);
      this.setData({
        cloth_id: options.cloth_id
      })
      app.globalData.cloth_id = options.cloth_id;
    } else {
      this.setData({
        cloth_id: app.globalData.cloth_id
      })
    }

    this.setData({
      is_pay: app.globalData.is_pay
    })

    console.log(this.data)

    // 是否点击查布源
    if (options.is_click) {
      this.setData({
        is_click: options.is_click
      })
    }

    // 是否有原色卡编号
    if (options.db_id) {
      this.setData({
        db_id: options.db_id
      })
    }

    // 如果已经支付，并且点击了查布源
    if (this.data.is_pay == true && this.data.is_click != 0) {
      wx.redirectTo({
        url: '../by/by',
      })
      return;
    } else if (this.data.is_click == 1) {
      this.setData({
        is_show_pay: true
      })
    }
    var that = this;

    var url = 'https://by.edenhe.com/api/record/sample/' + that.data.cloth_id + '/';

    if (that.data.db_id) {
      url = url + that.data.db_id;
    }
    wx.request({
      url: url,
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(that.data.cloth_id);
        console.log(res)
        //将获取到的json数据，存在名字叫detail的这个数组中
        that.setData({
          detail: res.data.data,
          //res代表success函数的事件对，data是固定的
        });
        app.globalData.show_cloth = that.data.detail;
        //app.globalData.userLevel = that.data.detail.userLevel;
        console.log(that.data.detail);
        that.setData({
          is_pay: that.data.detail.is_show_pay
        })
        app.globalData.is_pay = that.data.detail.is_show_pay;
        that.hideLoading();
      }
    });
    if (options.currentTab) {
      that.setData({
        currentTab: options.currentTab
      });
    }
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.showLoading();
    getApp().globalData.lastUrl = '../order/order_list'
    this.setData({
      lastUrl: getApp().globalData.lastUrl,
    });
  },

  showLoading: function () {
    $wuxLoading.show({
      text: '数据加载中',
    });
  },

  hideLoading: function () {
    $wuxLoading.hide();
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //更多颜色查看
  onMoreTap: function (e) {
    console.log("123");
    var that = this;
    wx.navigateTo({
      url: '../../pages/gm/gm?page=1&cloth_id=' + that.data.cloth_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //更多颜色查看
  onMoreTap2: function (e) {
    console.log("123");
    var that = this;
    wx.navigateTo({
      url: '../../pages/gm/gm?page=0&cloth_id=' + that.data.cloth_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  show_item: function (e) {
    wx.redirectTo({
      url: '../twxx/twxx?cloth_id=' + e.target.dataset.cloth_id
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

  onClickBuy: function() {
    var that = this;
    wx.navigateTo({
      url: '../../pages/subscribe/subscribe?cloth_id=' + that.data.cloth_id,
    })
  },

  // 多张图预览
  onPreviewImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var urls = [];
    for (var i = 0; i < this.data.detail.images.length; i++) {
      urls.push(this.data.detail.images[i].url);
    }

    wx.previewImage({
      current: urls[parseInt(index)],
      urls: urls,
    });
  },

  // 主题图预览
  onPreivewTitleImg: function (e) {
    var urls = [];
    urls.push("../../assets/images/testImg/icon-homePage.jpg");
    wx.previewImage({
      current: "../../assets/images/testImg/icon-homePage.jpg",
      urls: urls,
    });
  }
})

