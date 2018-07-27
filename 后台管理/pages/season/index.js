// pages/season/index.js
import { $wuxPicker } from '../../components/by'
import { $wuxToast } from '../../components/by'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "颜色设置",
    lastUrl: "",
    index: 0,
    matching_type_items: [
      { value: '春', name: '春', },
      { value: '夏', name: '夏', },
      { value: '秋', name: '秋', },
      { value: '冬', name: '冬', }
    ],
    selected_matching: '',
    selected_matching_name: '',
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

  choseSeason: function () {
    var values = [];
    var that = this;
    for (var i = 0; i < this.data.matching_type_items.length; i++) {
      values.push(this.data.matching_type_items[i].name);
    }
    console.log(values);
    $wuxPicker.init('matching', {
      title: "请选择季节",
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
    if (this.data.selected_matching.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请选择季节',
      });
      return;
    }
    console.log(e);
  }
})