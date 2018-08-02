// pages/like/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "相似商品设置",
    lastUrl: "",
    items: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      items: [
        { name: options.cloth_id, value: options.cloth_id, checked: true}
      ]
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

  add_item: function() {
    var that = this;
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        var code = res.result
        code = code.split(':')[2]
        code = code.split('-')[0]

        var items = that.data.items;

        items.push({ name: code, value: code, checked: true});

        that.setData({
          items: items
        })
      }
    })
  },

  add_similar: function (from_id, id) {
    var that = this;

    var data = {
      id: id
    };

    console.log(from_id + ',' + id);

    wx.request({
      url: 'https://by.edenhe.com/api/record/sample/' + from_id + '/similar/',
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

  onSubmit: function(e) {
    var that = this;
    var items = that.data.items;
    for (var i in items) {
      for (var j in items) {
        if (j > i && items[i].checked) {
          this.add_similar(items[i].value, items[j].value);
        }
      }
    }
  }
})