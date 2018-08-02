// pages/duration/index.
import { $wuxPicker } from '../../components/by'
import { $wuxToast } from '../../components/by'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "货期设置",
    lastUrl: "",
    index: 0,
    matching_type_items: [
      { value: '1', name: '现货', },
      { value: '2', name: '2天', },
      { value: '3', name: '3天', },
      { value: '4', name: '4天', },
      { value: '5', name: '5天', },
      { value: '6', name: '6天', },
      { value: '7', name: '7天', },
      { value: '8', name: '8天', },
      { value: '9', name: '9天', },
      { value: '10', name: '10天', },
      { value: '11', name: '11天', },
      { value: '12', name: '12天', },
      { value: '13', name: '13天', },
      { value: '14', name: '14天', },
      { value: '15', name: '15天', },
      { value: '16', name: '16天', }
    ],
    selected_matching: '',
    selected_matching_name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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


  choseDuration: function () {
    var values = [];
    var that = this;
    for (var i = 0; i < this.data.matching_type_items.length; i++) {
      values.push(this.data.matching_type_items[i].name);
    }
    console.log(values);
    $wuxPicker.init('matching', {
      title: "请选择货期",
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
        text: '请选择货期',
      });
      return;
    }

    var that = this;

    var data = {
      duration: parseInt(that.data.selected_matching)
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