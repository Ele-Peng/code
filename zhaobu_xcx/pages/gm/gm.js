// pages/gm/gm.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    tab: 0,
    account: 1,
    clothclass: 0,
    submitTab: 0,
    fromPage: 0,
    cloth_id: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var that = this;
    if (options.page) {
      that.setData({
        fromPage: options.page
      })
    }
    if (options.cloth_id) {
      that.setData({
        cloth_id: options.cloth_id
      })
    }
    that.data.detail = app.globalData.detail;
    wx.request({
      url: 'http://39.104.71.13:8001/get/',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        //将获取到的json数据，存在名字叫detail的这个数组中
        that.setData({
          price: res.data.price.sample,
          detail: res.data
          //res代表success函数的事件对，data是固定的
        });
        app.globalData.detail = that.data.detail;
      }
    });
  },

  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.tab === e.target.dataset.tab) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.tab
      })
    }
  },

  //颜色分类选择
  clickCurrent: function (e) {
    var that = this;
    if (this.data.current === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        current: e.target.dataset.current
      })
    }
  },

  //submit选择
  onSubmit: function (e) {
    var that = this;
    var chose_type = '样布';
    if (that.data.clothclass == 1) {
      chose_type = '大货';
    }
    if (e.target.dataset.submittab == 0) {
      wx.showLoading({
        title: '正在加入购物车',
      })
      wx.request({
        url: 'http://rapapi.org/mockjsdata/32201/api/gwc/add',
        data: {
          'id': that.data.cloth_id,
          'color': that.data.detail.colors[that.data.current],
          'account': that.data.account,
          'type': chose_type
        },
        header: {
          'Content-Type': 'application/json',
          'Cookie': wx.getStorageSync('cookie')
        },
        success: function (res) {
          console.log(res);
          wx.hideLoading();
          wx.redirectTo({
            url: '../gwc_2/gwc_2',
          })
        }
      })
    }
    that.setData({
      submitTab: e.target.dataset.submittab
    })
  },

  //布料款式选择
  clickclothClass: function (e) {
    var that = this;
    if (this.data.clothClass === e.target.dataset.clothclass) {
      return false;
    } else {
      that.setData({
        clothclass: e.target.dataset.clothclass
      })
    }
  },

  onClickAdd: function (e) {
    var that = this;
    if (that.data.account >= 99999) {
      that.data.account = 99998;
    }
    that.setData({
      account: that.data.account + 1
    })
  },

  onClickMinus: function (e) {
    var that = this;
    if (that.data.account <= 1) {
      return false;
    } else {
      that.setData({
        account: that.data.account - 1
      })
    }
  },
  //更多颜色查看
  onClose: function (e) {
    var that = this;
    wx.navigateBack({
      delta: 1
    })
  },

  input_number_event: function (e) {
    if (e.detail.value >= 99999) {
      e.detail.value = 99999;
    }
    this.setData({
      account: e.detail.value
    })
    return this.data.account;
  }
})