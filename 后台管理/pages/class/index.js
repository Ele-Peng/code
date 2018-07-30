// pages/class/index.js
import { $wuxToast } from '../../components/by'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "适用品类设置",
    lastUrl: "",
    cloth_id: -1,
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
    this.setData({
      cloth_id: options.cloth_id
    })

    var that = this

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
        for (var i in res.data.data.category) {
          matching_type_items.push({
            value: res.data.data.category[i].id,
            name: res.data.data.category[i].name
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


  checkboxChange: function (e) {
    var that = this;
    that.setData({
      class_list: e.detail.value
    })
    console.log(that.data.class_list)
  },

  onSubmit: function (e) {

    var that = this;

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


    var category = '';

    var flag = false;

    var class_list = that.data.class_list;

    for (var i in class_list) {
      if (flag) {
        category += ',';
      } else {
        flag = true;
      }
      category += class_list[i];
    }

    var data = {
      category: category
    }

    console.log(category);

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