// pages/colorStyle/index.js
import { $wuxToast } from '../../components/by'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "颜色样式设置",
    lastUrl: "",
    cloth_id: -1,
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
    var that = this;

    this.setData({
      cloth_id: options.cloth_id
    })


    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://by.edenhe.com/api/record/sample/options?season=1&category=1&style=1',
      header: {
        'Content-Type': 'application/json',
        'Cookie': wx.getStorageSync('cookie')
      },
      success: function (res) {
        console.log(res.data)
        var matching_type_items = []
        for (var i in res.data.data.style) {
          matching_type_items.push({
            value: res.data.data.style[i].id,
            name: res.data.data.style[i].name
          })
        }
        that.setData({
          items: matching_type_items
        })
        wx.hideLoading();
      },

      fail: function (res) {
        wx.showModal({
          title: '连接失败',
          content: '请重新启动微信小程序',
        })
        wx.hideLoading();
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
    if (!this.data.radio_list) {
      if (this.data.selected_matching.length == 0) {
        $wuxToast.show({
          type: 'forbidden',
          timer: 2000,
          color: '#fff',
          text: '请选择颜色样式',
        });
        return;
      }
    }
    var that = this;

    var data = {
      style: that.data.radio_list
    };

    console.log(data);

    wx.request({
      url: 'https://by.edenhe.com/api/record/sample/' + that.data.cloth_id + '/',
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
  }
})