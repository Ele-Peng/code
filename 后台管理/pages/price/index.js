// pages/price/index.js
import { $wuxPicker } from '../../components/by'
import { $wuxToast } from '../../components/by'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "价格设置",
    lastUrl: "",
    index: 0,
    matching_type_items: [
      { value: 'k', name: '元/千克', },
      { value: 'm', name: '元/米', },
      { value: 'y', name: '元/码', },
    ],
    selected_matching: '',
    selected_matching_name: '',
    screen_height: 0,
    price: 0.0,
    sample_price: 0.0
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          screen_height: res.windowHeight,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo();
    this.setData({
      cloth_id: options.cloth_id
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

  choseUnit: function () {
    var values = [];
    var that = this;
    for (var i = 0; i < this.data.matching_type_items.length; i++) {
      values.push(this.data.matching_type_items[i].name);
    }
    console.log(values);
    $wuxPicker.init('matching', {
      title: "请选择匹配程度",
      cols: [
        {
          textAlign: 'center',
          values: values,
        }
      ],
      value: [0],
      onChange(p) {
        console.log(p)
        var name = "";
        var value = "";
        for (var i = 0; i < that.data.matching_type_items.length; i++) {
          if (p.value[0] == that.data.matching_type_items[i].name) {
            name = that.data.matching_type_items[i].name;
            value = that.data.matching_type_items[i].value;
          }
        }
        this.setData({
          selected_matching: value,
          selected_matching_name: name
        })
      },
    });
  },

  onSubmit: function (e) {
    console.log(e);

    var that = this;
    
    /*
    if (this.data.selected_matching.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请选择大货单位',
      });
      return;
    }
    */

    if (e.detail.value.price == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请输入大货单价',
      });
      return;
    }

    if (e.detail.value.sample_price == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请输入样布单价',
      });
      return;
    }


    var data = {
      price: e.detail.value.price,
      sample_price: e.detail.value.sample_price
    }

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

  },

})