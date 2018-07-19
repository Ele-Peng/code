// pages/ksrg/ksrg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "快速认购",
    lastUrl: "",
    cloth_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 二维码扫一扫函数
   */
  clickScanCode: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        var strs = res.result.split(':')

        strs = strs[2];

        var cloth_id = strs.split('-')[0];
        var db_id = strs.split('-')[1];

        wx.navigateTo({
          url: '../twxx/twxx?db_id=' + db_id + '&cloth_id=' + cloth_id
        })

        wx.showToast({
          title: '成功',
          icon: 'warn',
          duration: 2000
        })
      },
      fail: (res) => {

      },
      complete: (res) => {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  idInput: function (e) {
    this.setData({
      cloth_id: e.detail.value
    })
  },

  enterScanCode: function(e) {
    // var that = this;
    // wx.navigateTo({
    //   url: '../twxx/twxx?cloth_id=' + that.data.cloth_id,
    // }),
    // $wuxToast.show({
    //   type: 'success',
    //   timer: 1500,
    //   color: '#fff',
    //   text: '认购成功',
    //   success: function () {
    //     wx.navigateBack();
    //   }
    // })
    var that = this
    wx.request({
      url: 'http://web.ngrok.52xygame.cn/has_key/?sk_id=' + that.data.cloth_id,
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        if (res.data.data == true) {
          wx.showModal({
            title: '成功',
            content: '数据库中有此色卡',
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '失败',
            content: '数据库中暂无此色卡',
            showCancel: false
          })
        }
      }
    });
   },

})