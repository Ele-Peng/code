// order_detail.js
import { $wuxLoading } from '../../components/wux'
var windowWidth = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading:"采购详情",
    lastUrl:"",
    show_username: false,
    order_id: '',
    user_type: '',
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 96,
    windowWidth: 0,
    tabs: ['需求详情', '采购进度'],
    detail: {},
    history: [],
    status_show: ['n', 'm', 'u', 'c', 'p', 's', 'f', 'i'],
    status_show_name: ['待接单', '未确认', '未支付', '订购中', '部分发货', '已发货', '已完成', '已失效'],
    update_btn_text: {
      'n': '上传码单',
      'c': '确认发货',
      'p': '确认发货',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.id;
    var user_type = options.type;

    var role = wx.getStorageSync('user_role');
    var show_username = true;
    if (user_type == 'user' && (role != 'm' && role != 'd')) {
      show_username = false;
    }

    console.log(options)
    this.setData({
      order_id: order_id,
      user_type: user_type,
      show_username: show_username,
    });
    var index = 0;
    if (options.tab) {
      index = parseInt(options.tab);
    }

    this.loadOrderDetail(order_id);
    this.getSystemInfo();
    var tabWidth = this.data.windowWidth / this.data.tabs.length;
    if (tabWidth < this.data.sliderWidth) {
      this.data.sliderWidth = tabWidth
    } else {
      this.data.sliderLeft = (tabWidth - this.data.sliderWidth) / 2
    }
    console.log(tabWidth, this.data.sliderWidth, this.data.sliderLeft)
    this.setData({
      activeIndex: index,
      sliderOffset: tabWidth * index,
      sliderWidth: this.data.sliderWidth,
      sliderLeft: this.data.sliderLeft,
      lastUrl: getApp().globalData.lastUrl,
    })
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          screen_height: res.windowHeight,
        })
        that.data.windowWidth = res.windowWidth
      }
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
    if (wx.getStorageSync('order_detail_update')) {
      wx.removeStorageSync('order_detail_update');
      this.loadOrderDetail(this.data.order_id);
    }
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

  loadOrderDetail: function () {
    this.showLoading();
    var that = this;
    var order_id = this.data.order_id;
    console.log(order_id);
    console.log(wx.getStorageSync('cookie'))
    wx.request({
      url: 'https://by.edenhe.com/api/order/' + order_id + "/",
      method: 'GET',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log('detail', res.data);
        that.hideLoading();
        that.setData({
          detail: res.data.data,
        });
        that.loadOrderStatus();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  loadOrderStatus: function() {
    var order_id = this.data.order_id;
    var that = this;
    
    wx.request({
      url: 'https://by.edenhe.com/api/order/' + order_id + '/status/',
      method: 'GET',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        for (var i in res.data.data) {
          res.data.data[i].display_date = res.data.data[i].display_time.substring(5, 10);
          res.data.data[i].display_hour = res.data.data[i].display_time.substring(11, 16);
        }
        that.setData({
          history: res.data.data.reverse()
        })
        console.log(that.data.history)
      },
      fail: function (res) {
        
        console.log(res.data);
      }
    })
  },

  showLoading: function () {
    $wuxLoading.show({
      text: '数据加载中',
    });
  },

  hideLoading: function () {
    $wuxLoading.hide();
  },

  onClickHistoryImage: function(e) {
    console.log(e);
    var urls = [e.currentTarget.dataset.thumb];
    wx.previewImage({
      current: urls[0],
      urls: urls,
    });
  },

  onClickCloth: function () {
    wx.navigateTo({
      url: '../result/detail?type=user&from=order&id=' + this.data.detail.cloth + '&order_id=' + this.data.order_id,
    })
  },

  // 切换页面
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    })
  },

  // 支付事件
  pay_event: function (e) {
    var that = this;
    wx.navigateTo({
      url: './pay?money=' + that.data.detail.price + '&id=' + that.data.detail.id,
    })
  },

  edit_event: function (e) {
    var that = this;
    wx.navigateTo({
      url: './update?type=' + that.data.user_type + '&status=' + that.data.detail.status + '&id=' + that.data.detail.id,
    })
  }
})